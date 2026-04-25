import { useAuth } from '../context/AuthContext'
import { APP_NAME } from '../utils/constants'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">{APP_NAME}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Smart insights for every match</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-slate-600 dark:text-slate-300">
            {user?.full_name ? `Welcome, ${user.full_name}` : 'Welcome'}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar