function TeamRecommendationCard({ player, index }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Player #{index + 1}</p>
          <h3 className="text-lg font-bold text-slate-800 mt-1">{player.player}</h3>
          <p className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">
            {player.role}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">Reward</p>
          <p className="text-xl font-bold text-green-700">{player.reward}</p>
        </div>
      </div>
    </div>
  )
}

export default TeamRecommendationCard