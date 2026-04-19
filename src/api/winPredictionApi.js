import axiosInstance from './axios'

export const getWinPrediction = async (payload) => {
  const response = await axiosInstance.post('/prediction/win', payload)
  return response.data
}

export const getWinTeams = async () => {
  const response = await axiosInstance.post('/prediction/win/teams', {})
  return response.data
}

export const getWinVenues = async (payload) => {
  const response = await axiosInstance.post('/prediction/win/venues', payload)
  return response.data
}