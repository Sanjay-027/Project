import React from 'react'

const Stat = ({value, label}) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-secondary">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
)

const Stats = () => {
  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-primary/5 p-6 rounded-lg">
        <Stat value="12k+" label="Jobs Posted" />
        <Stat value="3k+" label="Companies" />
        <Stat value="50k+" label="Applications" />
        <Stat value="8k+" label="Hires" />
      </div>
    </section>
  )
}

export default Stats
