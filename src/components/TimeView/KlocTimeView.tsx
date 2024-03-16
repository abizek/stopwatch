import { prefixZero } from '../../utils'
import { TimeView } from './TimeView'

interface KlocTimeViewProps {
  time: number
}

export function KlocTimeView({ time }: KlocTimeViewProps) {
  const date = new Date(time)

  let hours = date.getHours()
  const amPm = hours < 12 ? 'AM' : 'PM'
  hours %= 12
  if (hours === 0) hours = 12
  
  const [hh, mm, ss] = [
    hours,
    date.getMinutes(),
    date.getSeconds(),
  ].map(prefixZero)

  return (
    <TimeView id="kloc">
      {`${hh} : ${mm} : ${ss}`}

      <span className="text-xl md:text-3xl"> {amPm!}</span>
    </TimeView>
  )
}
