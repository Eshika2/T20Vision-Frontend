import axiosInstance from './axios'

export const getScorePrediction = async (payload) => {
  const response = await axiosInstance.post('/prediction/score', payload)
  return response.data
}