import axiosInstance from './axios'

export const getTeamRecommendation = async (payload) => {
  const response = await axiosInstance.post('/prediction/team', payload)
  return response.data
}