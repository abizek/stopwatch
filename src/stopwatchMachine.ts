import { nanoid } from 'nanoid'
import { setup, assign, stateIn } from 'xstate'

type Lap = {
  id: string
  elapsed: number
  overall: number
}

export const stopwatchMachine = setup({
  types: {
    context: {} as {
      origin: number
      elapsed: number
      lapOrigin: number
      lapElapsed: number
      laps: Lap[]
    },
    events: {} as
      | { type: 'start' }
      | { type: 'lap' }
      | { type: 'pause' }
      | { type: 'resume' }
      | { type: 'reset' },
  },
  actions: {
    setElapsed: assign(({ context }) => ({
      elapsed: Date.now() - context.origin,
    })),
    setOrigin: assign(({ context }) => ({
      origin: Date.now() - context.elapsed,
    })),
    setLapOrigin: assign(({ context }) => ({
      lapOrigin: Date.now() - context.lapElapsed,
    })),
    addLap: assign(({ context }) => ({
      laps: [
        ...context.laps,
        {
          id: nanoid(),
          elapsed: context.lapElapsed || context.elapsed,
          overall: context.elapsed,
          // TODO stat: 'min' | 'max' | null
        },
      ],
    })),
    resetLapStopwatch: assign(() => ({
      lapOrigin: Date.now(),
      lapElapsed: 0,
    })),
    setLapElapsed: assign(({ context }) => ({
      lapElapsed: Date.now() - context.lapOrigin,
    })),
    resetStopwatch: assign({
      origin: 0,
      elapsed: 0,
      lapOrigin: 0,
      lapElapsed: 0,
      laps: [],
    }),
  },
  guards: {
    isLapStopwatchStopped: stateIn({ started: { lapStopwatch: 'stopped' } }),
  },
}).createMachine({
  context: {
    origin: 0,
    elapsed: 0,
    lapOrigin: 0,
    lapElapsed: 0,
    laps: [],
  },
  id: 'stopwatch',
  initial: 'stopped',
  states: {
    stopped: {
      on: {
        start: {
          target: 'started',
          actions: {
            type: 'setOrigin',
          },
        },
      },
    },
    started: {
      type: 'parallel',
      on: {
        pause: {
          target: 'paused',
        },
      },
      states: {
        mainStopwatch: {
          initial: 'running',
          on: {
            lap: [
              {
                target: '#stopwatch.started.lapStopwatch.running',
                actions: [
                  {
                    type: 'addLap',
                  },
                  {
                    type: 'setLapOrigin',
                  },
                ],
                guard: {
                  type: 'isLapStopwatchStopped',
                },
              },
              {
                target: '#stopwatch.started.lapStopwatch.running',
                actions: [
                  {
                    type: 'addLap',
                  },
                  {
                    type: 'resetLapStopwatch',
                  },
                ],
              },
            ],
          },
          states: {
            running: {
              after: {
                '73': {
                  target: 'running',
                  actions: {
                    type: 'setElapsed',
                  },
                  reenter: true,
                },
              },
            },
          },
        },
        lapStopwatch: {
          initial: 'stopped',
          states: {
            stopped: {},
            running: {
              after: {
                '73': {
                  target: 'running',
                  actions: {
                    type: 'setLapElapsed',
                  },
                  reenter: true,
                },
              },
            },
          },
        },
      },
    },
    paused: {
      on: {
        resume: [
          {
            target: 'started',
            actions: {
              type: 'setOrigin',
            },
            guard: {
              type: 'isLapStopwatchStopped',
            },
          },
          {
            target: '#stopwatch.started.lapStopwatch.running',
            actions: [
              {
                type: 'setLapOrigin',
              },
              {
                type: 'setOrigin',
              },
            ],
          },
        ],
        reset: {
          target: 'stopped',
          actions: {
            type: 'resetStopwatch',
          },
        },
      },
    },
  },
})
