import axiosInstance from './axios'

export const getWinPrediction = async (payload) => {
  const response = await axiosInstance.post('/prediction/win', payload)
  return response.data
}