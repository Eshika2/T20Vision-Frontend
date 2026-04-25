import { useState } from 'react'

function HistoryAccordion({
  label,
  title,
  subtitle,
  dateTime,
  status,
  children,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {label}
            </p>
            <h4 className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
              {title}
            </h4>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-start gap-3">
            <div className="text-right">
              {dateTime && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {dateTime}
                </p>
              )}

              <p className="mt-2 text-sm">
                Status:{' '}
                <span
                  className={
                    status === 1
                      ? 'font-semibold text-green-600 dark:text-green-400'
                      : 'font-semibold text-red-600 dark:text-red-400'
                  }
                >
                  {status === 1 ? 'Success' : 'Failed'}
                </span>
              </p>
            </div>

            <div
              className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition duration-300 dark:bg-slate-800 ${
                open ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <svg
                className="h-5 w-5 text-slate-700 dark:text-slate-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-slate-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryAccordion