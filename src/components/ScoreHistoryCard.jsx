function ScoreHistoryCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Score Prediction</p>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            {item.batting_team} vs {item.bowling_team}
          </h4>
          <p className="text-sm text-slate-500 mt-1">{item.venue}</p>
          <p className="text-sm text-slate-500 mt-2">
            Current Score: <span className="font-medium text-slate-700">{item.current_score}</span> | Wickets Lost:{' '}
            <span className="font-medium text-slate-700">{item.wickets_lost}</span> | Balls Remaining:{' '}
            <span className="font-medium text-slate-700">{item.balls_remaining}</span> | Last Five:{' '}
            <span className="font-medium text-slate-700">{item.last_five}</span>
          </p>
        </div>

        <div className="text-sm text-slate-500 md:text-right">
          <p>{item.created_at}</p>
          <p className="mt-2">
            Status:{' '}
            <span className={item.status === 1 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {item.status === 1 ? 'Success' : 'Failed'}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Current Run Rate</p>
          <p className="text-2xl font-bold text-slate-800">{item.current_run_rate}</p>
        </div>

        <div className="rounded-xl bg-green-50 border border-green-100 p-4">
          <p className="text-sm text-slate-500">Predicted Final Score</p>
          <p className="text-2xl font-bold text-green-700">{item.predicted_final_score}</p>
        </div>
      </div>
    </div>
  )
}

export default ScoreHistoryCard