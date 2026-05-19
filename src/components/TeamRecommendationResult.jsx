import TeamRecommendationCard from './TeamRecommendationCard'

function TeamRecommendationResult({ result }) {
  if (!result) return null

  const contextInfo = result.context_info || {}
  const recommendedTeam = result.recommended_team || []

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">
          Recommendation Summary
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
            <p className="text-sm text-slate-500 dark:text-slate-400">My Team</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {result.my_team}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Opponent Team</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {result.opponent_team}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Venue</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {result.venue}
            </p>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-950/30">
            <p className="text-sm text-slate-500 dark:text-slate-400">Available Players</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              {result.available_players ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Batters / Bowlers / Allrounders
            </p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {result.batters} / {result.bowlers} / {result.allrounders}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Year Range</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {result.start_year} - {result.end_year}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">
          Context Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Overall Rows</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {contextInfo.overall_rows ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Opponent Rows</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {contextInfo.opponent_rows ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Venue Rows</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {contextInfo.venue_rows ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Exact Rows</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {contextInfo.exact_rows ?? 0}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">
          Recommended Team
        </h3>

        {recommendedTeam.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No players found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendedTeam.map((player, index) => (
              <TeamRecommendationCard key={index} player={player} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamRecommendationResult