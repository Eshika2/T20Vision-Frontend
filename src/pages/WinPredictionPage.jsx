import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SearchableSelectField from '../components/SearchableSelectField'
import WinPredictionResult from '../components/WinPredictionResult'
import {
  getWinPrediction,
  getWinTeams,
  getWinVenues,
} from '../api/winPredictionApi'

function WinPredictionPage() {
  const [form, setForm] = useState({
    batting_team: null,
    bowling_team: null,
    venue: null,
    target: '',
    score: '',
    overs_completed: '',
    wickets_out: '',
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
      const response = await getWinTeams()

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
      const response = await getWinVenues({
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">Win Prediction</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Predict the win probability in a T20 chase scenario.
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
              label="Target"
              name="target"
              type="number"
              value={form.target}
              onChange={handleInputChange}
              placeholder="e.g. 180"
            />

            <InputField
              label="Current Score"
              name="score"
              type="number"
              value={form.score}
              onChange={handleInputChange}
              placeholder="e.g. 95"
            />

            <InputField
              label="Overs Completed"
              name="overs_completed"
              type="number"
              value={form.overs_completed}
              onChange={handleInputChange}
              placeholder="e.g. 12.3"
            />

            <InputField
              label="Wickets Out"
              name="wickets_out"
              type="number"
              value={form.wickets_out}
              onChange={handleInputChange}
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