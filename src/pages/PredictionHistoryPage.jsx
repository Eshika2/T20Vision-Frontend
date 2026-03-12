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
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Prediction History</h2>
          <p className="text-slate-500 mt-2">
            View all your past win predictions, score predictions, and team recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
            <p className="text-sm text-slate-500">Win Predictions</p>
            <p className="text-3xl font-bold text-blue-700">{history.counts?.win_predictions ?? 0}</p>
          </div>

          <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
            <p className="text-sm text-slate-500">Score Predictions</p>
            <p className="text-3xl font-bold text-green-700">{history.counts?.score_predictions ?? 0}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Team Recommendations</p>
            <p className="text-3xl font-bold text-slate-800">{history.counts?.team_recommendations ?? 0}</p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
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
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
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
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
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
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
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