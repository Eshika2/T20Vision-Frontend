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
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold">Cricket Match Intelligence</h2>
        <p className="mt-3 text-blue-50 max-w-2xl">
          Use machine learning powered insights for win probability, score forecasting, and team recommendation.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-slate-800">{card.title}</h3>
            <p className="text-sm text-slate-500 mt-3 min-h-[60px]">{card.description}</p>
            <Link
              to={card.link}
              className="inline-block mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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