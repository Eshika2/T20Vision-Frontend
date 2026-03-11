function WinPredictionResult({ result }) {
  if (!result) return null

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Prediction Result</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm text-slate-500">Batting Team</p>
          <p className="text-lg font-semibold text-slate-800">{result.batting_team}</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">
            {result.batting_win_probability}%
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Bowling Team</p>
          <p className="text-lg font-semibold text-slate-800">{result.bowling_team}</p>
          <p className="mt-2 text-2xl font-bold text-slate-700">
            {result.bowling_win_probability}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default WinPredictionResult