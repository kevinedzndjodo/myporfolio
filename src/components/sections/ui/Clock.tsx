import { useState, useEffect } from 'react'

function Clock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="flex flex-col gap-1">
      <span className="text-muted text-xs md:text-sm">{date}</span>
      <span className="text-text text-2xl md:text-3xl font-semibold tabular-nums">{time}</span>
    </div>
  )
}

export default Clock