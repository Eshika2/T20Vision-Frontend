import { useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import TeamRecommendationResult from '../components/TeamRecommendationResult'
import { getTeamRecommendation } from '../api/teamPredictionApi'

function TeamRecommendationPage() {
  const [form, setForm] = useState({
    my_team: '',
    opponent_team: '',
    venue: '',
    batters: '5',
    bowlers: '3',
    allrounders: '3',
    start_year: '2023',
    end_year: '2026',
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
        my_team: form.my_team,
        opponent_team: form.opponent_team,
        venue: form.venue,
        batters: Number(form.batters),
        bowlers: Number(form.bowlers),
        allrounders: Number(form.allrounders),
        start_year: Number(form.start_year),
        end_year: Number(form.end_year),
      }

      const response = await getTeamRecommendation(payload)

      if (response?.success) {
        setResult(response.output)
        toast.success(response.message || 'Team recommendation successful')
      } else {
        toast.error(response?.message || 'Recommendation failed')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while getting team recommendation'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Team Recommendation</h2>
          <p className="text-slate-500 mt-2">
            Generate the best T20 team recommendation using team, opponent, venue, and year range.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
            <InputField
              label="My Team"
              name="my_team"
              value={form.my_team}
              onChange={handleChange}
              placeholder="e.g. Sri Lanka"
            />

            <InputField
              label="Opponent Team"
              name="opponent_team"
              value={form.opponent_team}
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
              label="Batters"
              name="batters"
              type="number"
              value={form.batters}
              onChange={handleChange}
              placeholder="5"
            />

            <InputField
              label="Bowlers"
              name="bowlers"
              type="number"
              value={form.bowlers}
              onChange={handleChange}
              placeholder="3"
            />

            <InputField
              label="Allrounders"
              name="allrounders"
              type="number"
              value={form.allrounders}
              onChange={handleChange}
              placeholder="3"
            />

            <InputField
              label="Start Year"
              name="start_year"
              type="number"
              value={form.start_year}
              onChange={handleChange}
              placeholder="2023"
            />

            <InputField
              label="End Year"
              name="end_year"
              type="number"
              value={form.end_year}
              onChange={handleChange}
              placeholder="2026"
            />

            <div className="md:col-span-2 xl:col-span-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Get Team Recommendation'}
              </Button>
            </div>
          </form>
        </div>

        <TeamRecommendationResult result={result} />
      </div>
    </MainLayout>
  )
}

export default TeamRecommendationPage