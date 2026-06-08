function TeamRecommendationCard({ player, index }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Player #{index + 1}
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
            {player.player}
          </h3>

          <p className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
            {player.role}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400 dark:text-slate-500">Reward</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-400">
            {player.reward}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TeamRecommendationCard