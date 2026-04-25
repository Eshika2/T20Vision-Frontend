import HistoryAccordion from './HistoryAccordion'

function TeamHistoryCard({ item }) {
  return (
    <HistoryAccordion
      label="Team Recommendation"
      title={`${item.my_team} vs ${item.opponent_team}`}
      subtitle={`${item.venue} • ${item.start_year} - ${item.end_year}`}
      dateTime={item.created_at}
      status={item.status}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">Available Players</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {item.available_players ?? 0}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Batters</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {item.batters}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Bowlers</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {item.bowlers}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Allrounders</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {item.allrounders}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            Recommended Team
          </p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {(item.recommended_team || []).map((player, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-900"
              >
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  {player.player}
                </p>
                <p className="mt-1 text-sm capitalize text-blue-700 dark:text-blue-400">
                  {player.role}
                </p>
                <p className="mt-1 text-sm font-medium text-green-700 dark:text-green-400">
                  Reward: {player.reward}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HistoryAccordion>
  )
}

export default TeamHistoryCard