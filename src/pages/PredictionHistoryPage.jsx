import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import { getPredictionHistory } from '../api/historyApi'
import HistorySectionTitle from '../components/HistorySectionTitle'
import WinHistoryCard from '../components/WinHistoryCard'
import ScoreHistoryCard from '../components/ScoreHistoryCard'
import TeamHistoryCard from '../components/TeamHistoryCard'

function PredictionHistoryPage() {
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState({
    win_predictions: [],
    score_predictions: [],
    team_recommendations: [],
    counts: {
      win_predictions: 0,
      score_predictions: 0,
      team_recommendations: 0,
    },
  })

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    setLoading(true)

    try {
      const response = await getPredictionHistory()

      if (response?.success) {
        setHistory(
          response.output || {
            win_predictions: [],
            score_predictions: [],
            team_recommendations: [],
            counts: {
              win_predictions: 0,
              score_predictions: 0,
              team_recommendations: 0,
            },
          }
        )
      } else {
        toast.error(response?.message || 'Failed to load prediction history')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while loading history'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
            Prediction History
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            View all your past win predictions, score predictions, and team recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">Win Predictions</p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              {history.counts?.win_predictions ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">Score Predictions</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-400">
              {history.counts?.score_predictions ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Team Recommendations</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {history.counts?.team_recommendations ?? 0}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            Loading history...
          </div>
        ) : (
          <>
            <section>
              <HistorySectionTitle
                title="Win Predictions"
                count={history.win_predictions?.length || 0}
              />
              <div className="space-y-4">
                {history.win_predictions?.length > 0 ? (
                  history.win_predictions.map((item) => (
                    <WinHistoryCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                    No win prediction history found.
                  </div>
                )}
              </div>
            </section>

            <section>
              <HistorySectionTitle
                title="Score Predictions"
                count={history.score_predictions?.length || 0}
              />
              <div className="space-y-4">
                {history.score_predictions?.length > 0 ? (
                  history.score_predictions.map((item) => (
                    <ScoreHistoryCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                    No score prediction history found.
                  </div>
                )}
              </div>
            </section>

            <section>
              <HistorySectionTitle
                title="Team Recommendations"
                count={history.team_recommendations?.length || 0}
              />
              <div className="space-y-4">
                {history.team_recommendations?.length > 0 ? (
                  history.team_recommendations.map((item) => (
                    <TeamHistoryCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                    No team recommendation history found.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default PredictionHistoryPage