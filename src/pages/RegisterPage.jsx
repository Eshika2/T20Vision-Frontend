import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { registerUser } from '../api/authApi'

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    full_name: '',
    user_name: '',
    email_address: '',
    age: '',
    password: '',
    password_confirmation: '',
  })

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const payload = {
        full_name: form.full_name,
        user_name: form.user_name,
        email_address: form.email_address,
        age: Number(form.age),
        password: form.password,
        password_confirmation: form.password_confirmation,
      }

      const response = await registerUser(payload)

      if (response?.success) {
        setSuccessMessage(response?.message || 'Registration successful')
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else {
        setErrorMessage(response?.message || 'Registration failed')
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while registering'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Register</h2>
        <p className="text-sm text-slate-500 mt-2">
          Create your T20Vision account
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Enter full name"
        />

        <InputField
          label="User Name"
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
          placeholder="Enter username"
        />

        <InputField
          label="Email Address"
          name="email_address"
          type="email"
          value={form.email_address}
          onChange={handleChange}
          placeholder="Enter email address"
        />

        <InputField
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Enter age"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <InputField
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm password"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}

export default RegisterPage