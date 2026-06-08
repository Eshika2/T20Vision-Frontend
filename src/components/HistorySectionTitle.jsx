function HistorySectionTitle({ title, count }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
        {count}
      </span>
    </div>
  )
}

export default HistorySectionTitle