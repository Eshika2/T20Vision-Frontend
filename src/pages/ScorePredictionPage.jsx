import { useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import ScorePredictionResult from '../components/ScorePredictionResult'
import { getScorePrediction } from '../api/scorePredictionApi'

function ScorePredictionPage() {
  const [form, setForm] = useState({
    batting_team: '',
    bowling_team: '',
    venue: '',
    current_score: '',
    wickets_lost: '',
    balls_remaining: '',
    last_five: '',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const payload = {
        batting_team: form.batting_team,
        bowling_team: form.bowling_team,
        venue: form.venue,
        current_score: Number(form.current_score),
        wickets_lost: Number(form.wickets_lost),
        balls_remaining: Number(form.balls_remaining),
        last_five: Number(form.last_five),
      }

      const response = await getScorePrediction(payload)

      if (response?.success) {
        setResult(response.output)
        toast.success(response.message || 'Score prediction successful')
      } else {
        toast.error(response?.message || 'Prediction failed')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while getting score prediction'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Score Prediction</h2>
          <p className="text-slate-500 mt-2">
            Predict the final first innings score in a T20 match.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <InputField
              label="Batting Team"
              name="batting_team"
              value={form.batting_team}
              onChange={handleChange}
              placeholder="e.g. Sri Lanka"
            />

            <InputField
              label="Bowling Team"
              name="bowling_team"
              value={form.bowling_team}
              onChange={handleChange}
              placeholder="e.g. Australia"
            />

            <InputField
              label="Venue"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="e.g. Pallekele International Cricket Stadium"
            />

            <InputField
              label="Current Score"
              name="current_score"
              type="number"
              value={form.current_score}
              onChange={handleChange}
              placeholder="e.g. 85"
            />

            <InputField
              label="Wickets Lost"
              name="wickets_lost"
              type="number"
              value={form.wickets_lost}
              onChange={handleChange}
              placeholder="e.g. 3"
            />

            <InputField
              label="Balls Remaining"
              name="balls_remaining"
              type="number"
              value={form.balls_remaining}
              onChange={handleChange}
              placeholder="e.g. 58"
            />

            <InputField
              label="Last Five Overs Runs"
              name="last_five"
              type="number"
              value={form.last_five}
              onChange={handleChange}
              placeholder="e.g. 42"
            />

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Predicting...' : 'Get Score Prediction'}
              </Button>
            </div>
          </form>
        </div>

        <ScorePredictionResult result={result} />
      </div>
    </MainLayout>
  )
}

export default ScorePredictionPage