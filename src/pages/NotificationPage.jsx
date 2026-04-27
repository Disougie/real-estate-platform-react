import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { apis } from '../api'

export default function NotificationPage() {
  const [page, setPage] = useState(0)
  const [size] = useState(10)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 })

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.notifications
      .getMyNotifications({ page, size })
      .then((res) => {
        if (!alive) return
        setData(res.data || { content: [], totalPages: 0, totalElements: 0 })
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [page, size])

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header activeNav="الاشعارات" />

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 border-r-4 border-primary bg-white">
          <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
            الاشعارات
          </h1>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-600">
            جاري تحميل الاشعارات...
          </div>
        ) : (
          <div className="space-y-4">
            {(data.content || []).map((notification, idx) => (
              <article
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-lg font-medium leading-relaxed text-gray-800">
                    {notification.message || '—'}
                  </p>
                </div>
                <p className="mt-3 text-sm text-gray-500">—</p>
              </article>
            ))}

            {(data.content || []).length === 0 && (
              <div className="rounded-xl bg-white p-6 text-center text-gray-600">
                لا توجد اشعارات
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
          <div className="text-sm text-gray-600">
            إجمالي النتائج: <span className="font-bold">{data.totalElements || 0}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page <= 0}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-700 disabled:opacity-50"
            >
              السابق
            </button>
            <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
              {page + 1} / {Math.max(1, data.totalPages || 1)}
            </span>
            <button
              type="button"
              onClick={() =>
                setPage((p) => {
                  const last = Math.max(0, (data.totalPages || 1) - 1)
                  return Math.min(last, p + 1)
                })
              }
              disabled={data.totalPages ? page >= data.totalPages - 1 : true}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-bold text-gray-700 disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
