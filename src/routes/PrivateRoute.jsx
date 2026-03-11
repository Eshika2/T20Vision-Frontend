import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute() {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 text-lg font-medium">Loading...</div>
      </div>
    )
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute