function HistorySectionTitle({ title, count }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
        {count}
      </span>
    </div>
  )
}

export default HistorySectionTitle