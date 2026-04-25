import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const menuClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400'
    }`

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-[81px] hidden h-[calc(100vh-81px)] w-72 overflow-y-auto border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 md:block">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={menuClass}>Dashboard</NavLink>
        <NavLink to="/win-prediction" className={menuClass}>Win Prediction</NavLink>
        <NavLink to="/score-prediction" className={menuClass}>Score Prediction</NavLink>
        <NavLink to="/team-recommendation" className={menuClass}>Team Recommendation</NavLink>
        <NavLink to="/prediction-history" className={menuClass}>Prediction History</NavLink>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-800"
        >
          Logout
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar