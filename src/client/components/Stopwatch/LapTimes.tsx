import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { StopwatchContext } from '../../machines/stopwatch'
import { prefixZero } from '../../utils'
import { ScrollArea } from './ScrollArea'
import { TimeView } from './TimeView'

type LapTimesProps = {
  laps: StopwatchContext['laps']
}

export function LapTimes({ laps }: LapTimesProps) {
  const [showArrows, setShowArrows] = useState(true)

  const { minId = null, maxId = null } = useMemo(() => {
    if (laps.length > 2) {
      const lapElapsedList = laps.map(({ elapsed }) => elapsed)
      const min = Math.min(...lapElapsedList)
      const max = Math.max(...lapElapsedList)
      let minId: string, maxId: string

      laps.forEach(({ id, elapsed }) => {
        if (elapsed === min) minId = id
        else if (elapsed === max) maxId = id
      })

      return { minId: minId!, maxId: maxId! }
    }

    return {}
  }, [laps])

  useEffect(() => {
    setShowArrows(true)
    const timeoutId = setTimeout(() => {
      setShowArrows(false)
    }, 600)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [minId, maxId])

  return (
    <motion.div
      layout
      transition={{ duration: 0 }}
      className="mt-12 font-medium"
    >
      <div className="mx-2 grid grid-cols-[64px_1.5fr_1fr] tracking-tight text-gray-400 md:text-lg">
        <span>Lap</span>
        <span>Lap time</span>
        <span>Overall time</span>
      </div>
      <div className="mb-5 mt-3 h-px bg-gray-200 dark:bg-gray-500/70" />
      <ScrollArea className="h-[20svh] w-full text-gray-400 h-sm:h-[30svh] dark:text-gray-300">
        <div className="mb-4 flex flex-col gap-4 text-base md:text-lg">
          {laps.map(({ id, elapsed, overall }, index) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ layout: { duration: laps.length === 1 ? 0 : 0.3 } }}
              key={id}
              className="relative grid grid-cols-[64px_1.5fr_1fr] px-2"
            >
              <AnimatePresence>
                {showArrows && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -translate-x-0.5 translate-y-1 md:translate-y-1.5"
                  >
                    {id === minId && (
                      <ArrowDown className="size-3.5 stroke-indigo-600 md:size-4 dark:stroke-indigo-500 dark:stroke-[3]" />
                    )}
                    {id === maxId && (
                      <ArrowUp className="size-3.5 stroke-red-600 md:size-4 dark:stroke-red-600" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <span
                data-cy={`lap-${laps.length - index}`}
                data-stat={
                  (id === minId && 'min') || (id === maxId && 'max') || null
                }
                className="data-[stat=max]:text-red-600 data-[stat=min]:text-indigo-500 data-[stat=min]:dark:text-indigo-400"
              >
                {prefixZero(laps.length - index)}
              </span>
              <span>
                <TimeView
                  variant="unstyled"
                  id={`lap-time-${laps.length - index}`}
                  time={elapsed}
                />
              </span>
              <span className="text-gray-700/90 dark:text-gray-50">
                <TimeView
                  variant="unstyled"
                  id={`overall-time-${laps.length - index}`}
                  time={overall}
                />
              </span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  )
}
