'use client'
import { useState, useEffect } from 'react'

const petals = [
  { left: '3%', size: 12, dur: 11, del: 0 },
  { left: '8%', size: 8, dur: 15, del: 2.5 },
  { left: '13%', size: 14, dur: 9, del: 7 },
  { left: '19%', size: 10, dur: 16, del: 1 },
  { left: '25%', size: 11, dur: 12, del: 8.5 },
  { left: '31%', size: 15, dur: 10, del: 3 },
  { left: '37%', size: 9, dur: 14, del: 6 },
  { left: '43%', size: 13, dur: 11, del: 4.5 },
  { left: '49%', size: 10, dur: 13, del: 9 },
  { left: '55%', size: 12, dur: 9, del: 1.5 },
  { left: '61%', size: 8, dur: 17, del: 10 },
  { left: '67%', size: 14, dur: 11, del: 5 },
  { left: '73%', size: 11, dur: 14, del: 2 },
  { left: '79%', size: 13, dur: 10, del: 7.5 },
  { left: '85%', size: 9, dur: 15, del: 0.5 },
  { left: '91%', size: 12, dur: 12, del: 11 },
  { left: '97%', size: 7, dur: 16, del: 3.5 },
  { left: '6%', size: 16, dur: 13, del: 12 },
  { left: '40%', size: 10, dur: 18, del: 4 },
  { left: '72%', size: 11, dur: 10, del: 8 },
  { left: '16%', size: 13, dur: 14, del: 13 },
  { left: '52%', size: 9, dur: 11, del: 6.5 },
  { left: '88%', size: 15, dur: 12, del: 14 },
  { left: '34%', size: 8, dur: 16, del: 5.5 },
  { left: '65%', size: 12, dur: 9, del: 15 },
]

export default function SakuraPetals() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className="sakura-petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
          }}
        />
      ))}
    </div>
  )
}
