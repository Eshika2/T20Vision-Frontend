import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { loginUser, getAuthUser } from '../api/authApi'

function LoginPage() {
  const navigate = useNavigate()
  const { login, updateUser } = useAuth()

  const [form, setForm] = useState({
    email_address: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await loginUser(form)

      if (response?.success) {
        const token = response?.output?.token

        if (!token) {
          setErrorMessage('Token not received from server')
          setLoading(false)
          return
        }

        login(token, null)

        try {
          const userResponse = await getAuthUser()

          if (userResponse?.success) {
            updateUser(userResponse.output || null)
          }
        } catch (userError) {
          console.log('User fetch failed:', userError)
        }

        navigate('/dashboard')
      } else {
        setErrorMessage(response?.message || 'Login failed')
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while logging in'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Login</h2>
        <p className="text-sm text-slate-500 mt-2">
          Welcome to T20Vision
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          name="email_address"
          type="email"
          value={form.email_address}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-6">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  )
}

export default LoginPage