import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout