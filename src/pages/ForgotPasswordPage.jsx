import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthLayout from '../layouts/AuthLayout'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { generateOtp, verifyOtp, resetPassword } from '../api/authApi'

function ForgotPasswordPage() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const [form, setForm] = useState({
    email_address: '',
    otp: '',
    reference: '',
    new_password: '',
    new_password_confirmation: '',
  })

  const [otpInfo, setOtpInfo] = useState({
    attempt_count: null,
    attempt_release_time: null,
  })

  useEffect(() => {
    let timer = null

    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [step, countdown])

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGenerateOtp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await generateOtp({
        email_address: form.email_address,
      })

      if (response?.success) {
        const reference = response?.output?.reference || ''
        const attemptCount = response?.output?.attempt_count ?? null
        const attemptReleaseTime = Number(response?.output?.attempt_release_time ?? 0)

        setForm((prev) => ({
          ...prev,
          reference,
        }))

        setOtpInfo({
          attempt_count: attemptCount,
          attempt_release_time: attemptReleaseTime,
        })

        setCountdown(attemptReleaseTime)

        toast.success(response?.message || 'OTP sent successfully')
        setStep(2)
      } else {
        toast.error(response?.message || 'Failed to send OTP')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while sending OTP'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await verifyOtp({
        email_address: form.email_address,
        otp: form.otp,
        reference: form.reference,
      })

      if (response?.success) {
        toast.success(response?.message || 'OTP verified successfully')
        setStep(3)
      } else {
        toast.error(response?.message || 'OTP verification failed')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while verifying OTP'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await resetPassword({
        email_address: form.email_address,
        new_password: form.new_password,
        new_password_confirmation: form.new_password_confirmation,
      })

      if (response?.success) {
        toast.success(response?.message || 'Password reset successful')
        navigate('/login')
      } else {
        toast.error(response?.message || 'Password reset failed')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Something went wrong while resetting password'
      )
    } finally {
      setLoading(false)
    }
  }

  const renderStepIndicator = () => {
    const steps = [
      { id: 1, label: 'Email' },
      { id: 2, label: 'OTP' },
      { id: 3, label: 'Reset' },
    ]

    return (
      <div className="mb-6 flex items-center justify-center gap-3">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              step === item.id
                ? 'bg-blue-600 text-white'
                : step > item.id
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          Forgot Password
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Recover your T20Vision account in a few steps
        </p>
      </div>

      {renderStepIndicator()}

      {step === 1 && (
        <form onSubmit={handleGenerateOtp} className="space-y-4">
          <InputField
            label="Email Address"
            name="email_address"
            type="email"
            value={form.email_address}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <InputField
            label="Email Address"
            name="email_address"
            type="email"
            value={form.email_address}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <InputField
            label="OTP Code"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter 6 digit OTP"
          />

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <p>
              <span className="font-semibold">Reference:</span> {form.reference || '-'}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Remaining Attempts:</span> {otpInfo.attempt_count ?? '-'}
            </p>
            <p className="mt-1">
              <span className="font-semibold">OTP Valid Time:</span>{' '}
              <span
                className={
                  countdown > 0
                    ? 'font-bold text-blue-700 dark:text-blue-400'
                    : 'font-bold text-red-600 dark:text-red-400'
                }
              >
                {countdown > 0 ? formatTime(countdown) : 'Expired'}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              onClick={() => setStep(1)}
            >
              Back
            </Button>

            <Button type="submit" disabled={loading || countdown === 0}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <InputField
            label="Email Address"
            name="email_address"
            type="email"
            value={form.email_address}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <InputField
            label="New Password"
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <InputField
            label="Confirm New Password"
            name="new_password_confirmation"
            type="password"
            value={form.new_password_confirmation}
            onChange={handleChange}
            placeholder="Confirm new password"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              type="button"
              className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              onClick={() => setStep(2)}
            >
              Back
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  )
}

export default ForgotPasswordPage