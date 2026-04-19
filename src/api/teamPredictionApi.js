import axiosInstance from './axios'

export const getTeamRecommendation = async (payload) => {
  const response = await axiosInstance.post('/prediction/team', payload)
  return response.data
}

export const getTeamTeams = async () => {
  const response = await axiosInstance.post('/prediction/team/teams', {})
  return response.data
}

export const getTeamVenues = async (payload) => {
  const response = await axiosInstance.post('/prediction/team/venues', payload)
  return response.data
}