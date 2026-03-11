import { useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import WinPredictionResult from '../components/WinPredictionResult'
import { getWinPrediction } from '../api/winPredictionApi'

function WinPredictionPage() {
  const [form, setForm] = useState({
    batting_team: '',
    bowling_team: '',
    venue: '',
    target: '',
    score: '',
    overs_completed: '',
    wickets_out: '',
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
        target: Number(form.target),
        score: Number(form.score),
        overs_completed: Number(form.overs_completed),
        wickets_out: Number(form.wickets_out),
      }

      const response = await getWinPrediction(payload)

      if (response?.success) {
        setResult(response.output)
        toast.success(response.message || 'Win prediction successful')
      } else {
        toast.error(response?.message || 'Prediction failed')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while getting prediction'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Win Prediction</h2>
          <p className="text-slate-500 mt-2">
            Predict the win probability in a T20 chase scenario.
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
              placeholder="e.g. India"
            />

            <InputField
              label="Venue"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="e.g. Pallekele International Cricket Stadium"
            />

            <InputField
              label="Target"
              name="target"
              type="number"
              value={form.target}
              onChange={handleChange}
              placeholder="e.g. 180"
            />

            <InputField
              label="Current Score"
              name="score"
              type="number"
              value={form.score}
              onChange={handleChange}
              placeholder="e.g. 95"
            />

            <InputField
              label="Overs Completed"
              name="overs_completed"
              type="number"
              value={form.overs_completed}
              onChange={handleChange}
              placeholder="e.g. 12.3"
            />

            <InputField
              label="Wickets Out"
              name="wickets_out"
              type="number"
              value={form.wickets_out}
              onChange={handleChange}
              placeholder="e.g. 4"
            />

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Predicting...' : 'Get Win Prediction'}
              </Button>
            </div>
          </form>
        </div>

        <WinPredictionResult result={result} />
      </div>
    </MainLayout>
  )
}

export default WinPredictionPage