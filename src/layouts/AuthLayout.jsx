function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout