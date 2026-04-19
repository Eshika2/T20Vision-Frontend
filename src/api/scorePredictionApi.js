import axiosInstance from './axios'

export const getScorePrediction = async (payload) => {
  const response = await axiosInstance.post('/prediction/score', payload)
  return response.data
}

export const getScoreTeams = async () => {
  const response = await axiosInstance.post('/prediction/score/teams', {})
  return response.data
}

export const getScoreVenues = async (payload) => {
  const response = await axiosInstance.post('/prediction/score/venues', payload)
  return response.data
}