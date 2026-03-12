function WinHistoryCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Win Prediction</p>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            {item.batting_team} vs {item.bowling_team}
          </h4>
          <p className="text-sm text-slate-500 mt-1">{item.venue}</p>
          <p className="text-sm text-slate-500 mt-2">
            Target: <span className="font-medium text-slate-700">{item.target}</span> | Score:{' '}
            <span className="font-medium text-slate-700">{item.score}</span> | Overs:{' '}
            <span className="font-medium text-slate-700">{item.overs_completed}</span> | Wickets:{' '}
            <span className="font-medium text-slate-700">{item.wickets_out}</span>
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
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm text-slate-500">{item.batting_team} Win Probability</p>
          <p className="text-2xl font-bold text-blue-700">{item.batting_win_probability}%</p>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-sm text-slate-500">{item.bowling_team} Win Probability</p>
          <p className="text-2xl font-bold text-slate-700">{item.bowling_win_probability}%</p>
        </div>
      </div>
    </div>
  )
}

export default WinHistoryCard