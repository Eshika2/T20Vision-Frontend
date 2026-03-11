import axiosInstance from './axios'

export const registerUser = async (payload) => {
  const response = await axiosInstance.post('/auth/register', payload)
  return response.data
}

export const loginUser = async (payload) => {
  const response = await axiosInstance.post('/auth/login', payload)
  return response.data
}

export const getAuthUser = async () => {
  const response = await axiosInstance.post('/auth/user')
  return response.data
}

export const logoutUser = async () => {
  const response = await axiosInstance.post('/logout')
  return response.data
}