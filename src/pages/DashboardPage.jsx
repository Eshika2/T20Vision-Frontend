import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function DashboardPage() {
  const cards = [
    {
      title: 'Win Prediction',
      description: 'Predict the probability of winning during a chase.',
      link: '/win-prediction',
    },
    {
      title: 'Score Prediction',
      description: 'Estimate the final first innings score.',
      link: '/score-prediction',
    },
    {
      title: 'Team Recommendation',
      description: 'Generate the best team recommendation based on context.',
      link: '/team-recommendation',
    },
    {
      title: 'Prediction History',
      description: 'View all your previous prediction records.',
      link: '/prediction-history',
    },
  ]

  return (
    <MainLayout>
      <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold">Cricket Match Intelligence</h2>
        <p className="mt-3 max-w-2xl text-blue-50">
          Use machine learning powered insights for win probability, score forecasting, and team recommendation.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {card.title}
            </h3>
            <p className="mt-3 min-h-[60px] text-sm text-slate-500 dark:text-slate-400">
              {card.description}
            </p>
            <Link
              to={card.link}
              className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Open
            </Link>
          </div>
        ))}
      </section>
    </MainLayout>
  )
}

export default DashboardPage