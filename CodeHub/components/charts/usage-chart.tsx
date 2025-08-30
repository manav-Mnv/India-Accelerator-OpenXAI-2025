"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", analyses: 8, shares: 3 },
  { name: "Tue", analyses: 14, shares: 4 },
  { name: "Wed", analyses: 11, shares: 6 },
  { name: "Thu", analyses: 18, shares: 5 },
  { name: "Fri", analyses: 9, shares: 2 },
  { name: "Sat", analyses: 6, shares: 1 },
  { name: "Sun", analyses: 7, shares: 2 },
]

export function UsageChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
          <YAxis stroke="currentColor" fontSize={12} />
          <Tooltip />
          <Bar dataKey="analyses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
