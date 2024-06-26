import { isEmpty, isEqual, pick } from 'lodash'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'
import type {
  Actor,
  ActorOptions,
  AnyStateMachine,
  EventFromLogic,
  StateFrom,
} from 'xstate'
import { createActor } from 'xstate'
import type { Category, State } from '../../types'

export function useMachineParty<TMachine extends AnyStateMachine>(
  machine: TMachine,
  updateRoom: (data: { [index in Category]?: State }) => void,
  connected: boolean,
): [StateFrom<TMachine>, Actor<TMachine>['send'], Actor<TMachine>] {
  const machineId = useMemo(() => machine.config.id!, [machine.config.id])

  const persistedSnapshotUnparsed = sessionStorage.getItem(machineId)
  const persistedSnapshot = useMemo(() => {
    const snapshot = JSON.parse(persistedSnapshotUnparsed ?? 'null')

    return { ...snapshot, children: {} } as StateFrom<TMachine>
  }, [persistedSnapshotUnparsed])

  const persist = useCallback(
    (value: object, updateRoomOnPersist: boolean = true) => {
      const pickedValue = pick(value, ['context', 'status', 'value'])
      sessionStorage.setItem(machineId, JSON.stringify(pickedValue))

      if (updateRoomOnPersist && connected) {
        updateRoom({ [machineId]: pickedValue })
      }
    },
    [connected, machineId, updateRoom],
  )

  const [actorRef, setActorRef] = useState(() => {
    const isSnapshotPersisted = !isEmpty(
      pick(persistedSnapshot, ['context', 'status', 'value']),
    )
    const actorRef = createActor(machine, {
      ...(isSnapshotPersisted && {
        snapshot: { ...persistedSnapshot },
      }),
    } as ActorOptions<TMachine>)

    if (!isSnapshotPersisted) {
      persist(actorRef.getPersistedSnapshot(), false)
    }

    return actorRef
  })

  useEffect(() => {
    const listener = () => {
      const actorRef = createActor(machine)
      persist(actorRef.getPersistedSnapshot(), false)
      setActorRef(actorRef)
    }
    window.addEventListener(`${machineId}-reset`, listener as EventListener)

    return () => {
      window.removeEventListener(
        `${machineId}-reset`,
        listener as EventListener,
      )
    }
  }, [machine, machineId, persist])

  useEffect(() => {
    const listener = (event: CustomEvent) => {
      persist(event.detail, false)
      setActorRef(
        createActor(machine, {
          ...(!isEmpty(event.detail) && {
            snapshot: { ...event.detail, children: {} },
          }),
        } as ActorOptions<TMachine>),
      )
    }
    window.addEventListener(`${machineId}-update`, listener as EventListener)

    return () => {
      window.removeEventListener(
        `${machineId}-update`,
        listener as EventListener,
      )
    }
  }, [machine, machineId, persist])

  useEffect(() => {
    actorRef.start()

    return () => {
      const snapshot = actorRef.getSnapshot()
      actorRef.stop()

      // 'always' actions don't trigger listeners without this weird private property mutation
      // ¯\_(ツ)_/¯ don't know why or how, it just works™. Source: https://github.com/statelyai/xstate/blob/a67e99f13d1770f3a6eeda9887bb5fff666c0db8/packages/xstate-react/src/stopRootWithRehydration.ts#L34
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(actorRef as any)._snapshot = snapshot
    }
  }, [actorRef])

  const getSnapshot = useCallback(
    () => actorRef.getSnapshot() as StateFrom<TMachine>,
    [actorRef],
  )

  const subscribe = useCallback(
    (onChange: () => void) => {
      const { unsubscribe } = actorRef.subscribe(onChange)
      return unsubscribe
    },
    [actorRef],
  )

  const snapshot = useSyncExternalStore(subscribe, getSnapshot)
  const rawSend = actorRef.send

  useEffect(() => {
    // To jumpstart 'always' actions when restoring from persisted state
    rawSend({ type: 'jumpstart' } as EventFromLogic<TMachine>)
  }, [rawSend])

  useEffect(() => {
    if (!isEqual(snapshot.value, persistedSnapshot.value)) {
      persist(actorRef.getPersistedSnapshot())
    }
  }, [actorRef, persist, persistedSnapshot.value, snapshot.value])

  const send = useCallback(
    (event: EventFromLogic<TMachine>) => {
      rawSend(event)
      persist(actorRef.getPersistedSnapshot())
    },
    [actorRef, persist, rawSend],
  )

  return [snapshot, send, actorRef]
}
