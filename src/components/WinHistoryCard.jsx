import HistoryAccordion from './HistoryAccordion'

function WinHistoryCard({ item }) {
  return (
    <HistoryAccordion
      label="Win Prediction"
      title={`${item.batting_team} vs ${item.bowling_team}`}
      subtitle={`${item.venue} • Target ${item.target} • Score ${item.score}`}
      dateTime={item.created_at}
      status={item.status}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {item.batting_team} Win Probability
          </p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
            {item.batting_win_probability}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {item.bowling_team} Win Probability
          </p>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">
            {item.bowling_win_probability}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 md:col-span-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">Match Details</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            Overs Completed:{' '}
            <span className="font-semibold">{item.overs_completed}</span> | Wickets Out:{' '}
            <span className="font-semibold">{item.wickets_out}</span>
          </p>
        </div>
      </div>
    </HistoryAccordion>
  )
}

export default WinHistoryCard