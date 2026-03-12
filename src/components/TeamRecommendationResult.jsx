import TeamRecommendationCard from './TeamRecommendationCard'

function TeamRecommendationResult({ result }) {
  if (!result) return null

  const contextInfo = result.context_info || {}
  const recommendedTeam = result.recommended_team || []

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Recommendation Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
            <p className="text-sm text-slate-500">My Team</p>
            <p className="text-lg font-semibold text-slate-800">{result.my_team}</p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Opponent Team</p>
            <p className="text-lg font-semibold text-slate-800">{result.opponent_team}</p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Venue</p>
            <p className="text-lg font-semibold text-slate-800">{result.venue}</p>
          </div>

          <div className="rounded-xl bg-green-50 border border-green-100 p-4">
            <p className="text-sm text-slate-500">Available Players</p>
            <p className="text-2xl font-bold text-green-700">{result.available_players ?? 0}</p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Batters / Bowlers / Allrounders</p>
            <p className="text-lg font-semibold text-slate-800">
              {result.batters} / {result.bowlers} / {result.allrounders}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Year Range</p>
            <p className="text-lg font-semibold text-slate-800">
              {result.start_year} - {result.end_year}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Context Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Overall Rows</p>
            <p className="text-xl font-bold text-slate-800">{contextInfo.overall_rows ?? 0}</p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Opponent Rows</p>
            <p className="text-xl font-bold text-slate-800">{contextInfo.opponent_rows ?? 0}</p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Venue Rows</p>
            <p className="text-xl font-bold text-slate-800">{contextInfo.venue_rows ?? 0}</p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Exact Rows</p>
            <p className="text-xl font-bold text-slate-800">{contextInfo.exact_rows ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Recommended Team</h3>

        {recommendedTeam.length === 0 ? (
          <p className="text-slate-500">No players found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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