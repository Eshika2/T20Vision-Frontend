import HistoryAccordion from './HistoryAccordion'

function ScoreHistoryCard({ item }) {
  return (
    <HistoryAccordion
      label="Score Prediction"
      title={`${item.batting_team} vs ${item.bowling_team}`}
      subtitle={`${item.venue} • Current Score ${item.current_score}`}
      dateTime={item.created_at}
      status={item.status}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Current Run Rate</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {item.current_run_rate}
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/40">
          <p className="text-sm text-slate-500 dark:text-slate-400">Predicted Final Score</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">
            {item.predicted_final_score}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 md:col-span-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">Innings Details</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            Wickets Lost: <span className="font-semibold">{item.wickets_lost}</span> | Balls Remaining:{' '}
            <span className="font-semibold">{item.balls_remaining}</span> | Last Five Overs Runs:{' '}
            <span className="font-semibold">{item.last_five}</span>
          </p>
        </div>
      </div>
    </HistoryAccordion>
  )
}

export default ScoreHistoryCard