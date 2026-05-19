function ScorePredictionResult({ result }) {
  if (!result) return null

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-xl font-bold text-slate-800 dark:text-slate-100">
        Prediction Result
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
          <p className="text-sm text-slate-500 dark:text-slate-400">Batting Team</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {result.batting_team}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Bowling Team</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {result.bowling_team}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Venue</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {result.venue}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">Current Run Rate</p>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {result.current_run_rate}
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-950/30 md:col-span-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">Predicted Final Score</p>
          <p className="text-3xl font-bold text-green-700 dark:text-green-400">
            {result.predicted_final_score}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ScorePredictionResult