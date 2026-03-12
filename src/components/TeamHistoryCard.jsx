function TeamHistoryCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-400">Team Recommendation</p>
          <h4 className="text-lg font-bold text-slate-800 mt-1">
            {item.my_team} vs {item.opponent_team}
          </h4>
          <p className="text-sm text-slate-500 mt-1">{item.venue}</p>
          <p className="text-sm text-slate-500 mt-2">
            Batters: <span className="font-medium text-slate-700">{item.batters}</span> | Bowlers:{' '}
            <span className="font-medium text-slate-700">{item.bowlers}</span> | Allrounders:{' '}
            <span className="font-medium text-slate-700">{item.allrounders}</span> | Years:{' '}
            <span className="font-medium text-slate-700">{item.start_year} - {item.end_year}</span>
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

      <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-slate-500">Available Players</p>
        <p className="text-2xl font-bold text-blue-700">{item.available_players ?? 0}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-700 mb-3">Recommended Team</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {(item.recommended_team || []).map((player, index) => (
            <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-800">{player.player}</p>
              <p className="text-sm text-blue-700 capitalize mt-1">{player.role}</p>
              <p className="text-sm text-green-700 font-medium mt-1">Reward: {player.reward}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamHistoryCard