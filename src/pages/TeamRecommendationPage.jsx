import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from '../layouts/MainLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import SearchableSelectField from '../components/SearchableSelectField'
import TeamRecommendationResult from '../components/TeamRecommendationResult'
import {
  getTeamRecommendation,
  getTeamTeams,
  getTeamVenues,
} from '../api/teamPredictionApi'

function TeamRecommendationPage() {
  const [form, setForm] = useState({
    my_team: null,
    opponent_team: null,
    venue: null,
    batters: '5',
    bowlers: '3',
    allrounders: '3',
    start_year: '2023',
    end_year: '2026',
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
    const myTeam = form.my_team?.value
    const opponentTeam = form.opponent_team?.value

    if (myTeam && opponentTeam && myTeam !== opponentTeam) {
      fetchVenues(myTeam, opponentTeam)
    } else {
      setVenues([])
      setForm((prev) => ({
        ...prev,
        venue: null,
      }))
    }
  }, [form.my_team, form.opponent_team])

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
      const response = await getTeamTeams()

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
      const response = await getTeamVenues({
        team1,
        team2,
        start_year: Number(form.start_year),
        end_year: Number(form.end_year),
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
        my_team: form.my_team?.value || '',
        opponent_team: form.opponent_team?.value || '',
        venue: form.venue?.value || '',
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
            <SearchableSelectField
              label="My Team"
              value={form.my_team}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, my_team: selected }))
              }
              options={teamOptions}
              placeholder={loadingTeams ? 'Loading teams...' : 'Search my team'}
              isDisabled={loadingTeams}
            />

            <SearchableSelectField
              label="Opponent Team"
              value={form.opponent_team}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, opponent_team: selected }))
              }
              options={teamOptions}
              placeholder={loadingTeams ? 'Loading teams...' : 'Search opponent team'}
              isDisabled={loadingTeams}
            />

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
              isDisabled={!form.my_team || !form.opponent_team || loadingVenues}
            />

            <InputField
              label="Batters"
              name="batters"
              type="number"
              value={form.batters}
              onChange={handleInputChange}
              placeholder="5"
            />

            <InputField
              label="Bowlers"
              name="bowlers"
              type="number"
              value={form.bowlers}
              onChange={handleInputChange}
              placeholder="3"
            />

            <InputField
              label="Allrounders"
              name="allrounders"
              type="number"
              value={form.allrounders}
              onChange={handleInputChange}
              placeholder="3"
            />

            <InputField
              label="Start Year"
              name="start_year"
              type="number"
              value={form.start_year}
              onChange={handleInputChange}
              placeholder="2023"
            />

            <InputField
              label="End Year"
              name="end_year"
              type="number"
              value={form.end_year}
              onChange={handleInputChange}
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