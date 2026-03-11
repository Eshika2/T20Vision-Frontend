import { useAuth } from '../context/AuthContext'
import { APP_NAME } from '../utils/constants'

function Navbar() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-700">{APP_NAME}</h1>
          <p className="text-sm text-slate-500">Smart insights for every cricket match</p>
        </div>

        <div className="text-sm text-slate-600">
          {user?.full_name ? `Welcome, ${user.full_name}` : 'Welcome'}
        </div>
      </div>
    </header>
  )
}

export default Navbar