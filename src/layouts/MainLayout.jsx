import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <Sidebar />
      <main className="p-6 md:ml-72 md:p-8">
        {children}
      </main>
    </div>
  )
}

export default MainLayout