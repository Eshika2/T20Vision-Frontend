import axiosInstance from './axios'

export const getPredictionHistory = async () => {
  const response = await axiosInstance.post('/prediction/history', {})
  return response.data
}