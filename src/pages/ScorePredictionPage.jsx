import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SearchableSelectField from '../components/SearchableSelectField'
import ScorePredictionResult from '../components/ScorePredictionResult'
import {
  getScorePrediction,
  getScoreTeams,
  getScoreVenues,
} from '../api/scorePredictionApi'

function ScorePredictionPage() {
  const [form, setForm] = useState({
    batting_team: null,
    bowling_team: null,
    venue: null,
    current_score: '',
    wickets_lost: '',
    balls_remaining: '',
    last_five: '',
  })

  const [teams, setTeams] = useState([])
  const [venues, setVenues] = useState([])
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [loadingVenues, setLoadingVenues] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    const battingTeam = form.batting_team?.value
    const bowlingTeam = form.bowling_team?.value

    if (battingTeam && bowlingTeam && battingTeam !== bowlingTeam) {
      fetchVenues(battingTeam, bowlingTeam)
    } else {
      setVenues([])
      setForm((prev) => ({
        ...prev,
        venue: null,
      }))
    }
  }, [form.batting_team, form.bowling_team])

  const teamOptions = useMemo(
    () => teams.map((team) => ({ value: team, label: team })),
    [teams]
  )

  const venueOptions = useMemo(
    () => venues.map((venue) => ({ value: venue, label: venue })),
    [venues]
  )

  const fetchTeams = async () => {
    setLoadingTeams(true)

    try {
      const response = await getScoreTeams()

      if (response?.success) {
        setTeams(response?.output?.teams || [])
      } else {
        toast.error(response?.message || 'Failed to load teams')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while loading teams'
      )
    } finally {
      setLoadingTeams(false)
    }
  }

  const fetchVenues = async (team1, team2) => {
    setLoadingVenues(true)

    try {
      const response = await getScoreVenues({
        team1,
        team2,
        start_year: 2023,
        end_year: 2026,
      })

      if (response?.success) {
        setVenues(response?.output?.venues || [])
      } else {
        toast.error(response?.message || 'Failed to load venues')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while loading venues'
      )
    } finally {
      setLoadingVenues(false)
    }
  }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const payload = {
        batting_team: form.batting_team?.value || '',
        bowling_team: form.bowling_team?.value || '',
        venue: form.venue?.value || '',
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">Score Prediction</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Predict the final first innings score in a T20 match.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <SearchableSelectField
              label="Batting Team"
              value={form.batting_team}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, batting_team: selected }))
              }
              options={teamOptions}
              placeholder={loadingTeams ? 'Loading teams...' : 'Search batting team'}
              isDisabled={loadingTeams}
            />

            <SearchableSelectField
              label="Bowling Team"
              value={form.bowling_team}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, bowling_team: selected }))
              }
              options={teamOptions}
              placeholder={loadingTeams ? 'Loading teams...' : 'Search bowling team'}
              isDisabled={loadingTeams}
            />

            <div className="md:col-span-2">
              <SearchableSelectField
                label="Venue"
                value={form.venue}
                onChange={(selected) =>
                  setForm((prev) => ({ ...prev, venue: selected }))
                }
                options={venueOptions}
                placeholder={
                  loadingVenues
                    ? 'Loading venues...'
                    : 'Search venue or type a new venue'
                }
                isCreatable
                isDisabled={!form.batting_team || !form.bowling_team || loadingVenues}
              />
              <p className="text-xs text-slate-500 dark:text-slate-200 mt-2">
                Select a venue from suggestions, or type a new venue if it is not listed.
              </p>
            </div>

            <InputField
              label="Current Score"
              name="current_score"
              type="number"
              value={form.current_score}
              onChange={handleInputChange}
              placeholder="e.g. 85"
            />

            <InputField
              label="Wickets Lost"
              name="wickets_lost"
              type="number"
              value={form.wickets_lost}
              onChange={handleInputChange}
              placeholder="e.g. 3"
            />

            <InputField
              label="Balls Remaining"
              name="balls_remaining"
              type="number"
              value={form.balls_remaining}
              onChange={handleInputChange}
              placeholder="e.g. 58"
            />

            <InputField
              label="Last Five Overs Runs"
              name="last_five"
              type="number"
              value={form.last_five}
              onChange={handleInputChange}
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