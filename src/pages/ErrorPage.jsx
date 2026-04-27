import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'

function tryParseJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export default function ErrorPage() {
  const location = useLocation()

  const payload = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const encoded = params.get('data')
    if (encoded) {
      const decoded = decodeURIComponent(encoded)
      return tryParseJson(decoded)
    }
    return location.state?.error || null
  }, [location.search, location.state])

  const safePayload = payload || {
    path: location.pathname,
    status: 'UNKNOWN',
    message: 'حدث خطأ غير متوقع',
    time: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 py-10 md:px-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <div className="bg-primary px-6 py-5 text-white">
            <h1 className="text-right text-3xl font-extrabold">
              حدث خطأ أثناء تنفيذ العملية
            </h1>
            <p className="mt-2 text-right text-white/90">
              يمكنك العودة وتكرار المحاولة أو تسجيل الدخول مرة أخرى.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Info label="الحالة" value={safePayload.status} />
              <Info label="المسار" value={safePayload.path} />
              <Info label="الوقت" value={safePayload.time} className="md:col-span-2" />
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-2 text-right font-bold text-gray-800">الرسالة</p>
              <p className="text-right leading-7 text-gray-700">
                {safePayload.message}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-2 text-right font-bold text-gray-800">
                بيانات الخطأ (JSON)
              </p>
              <pre className="overflow-auto rounded-lg bg-white p-4 text-left text-sm text-gray-800 ring-1 ring-gray-200">
                {JSON.stringify(safePayload, null, 2)}
              </pre>
            </div>

            <div className="flex flex-wrap justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg bg-primary px-8 py-3 font-bold text-white transition hover:bg-primary/90"
              >
                إعادة المحاولة
              </button>
              <Link
                to="/login"
                className="rounded-lg border-2 border-primary bg-white px-8 py-3 font-bold text-primary transition hover:bg-primary/5"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/"
                className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 transition hover:bg-gray-100"
              >
                الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Info({ label, value, className = '' }) {
  return (
    <div className={`rounded-xl bg-gray-50 p-4 ${className}`}>
      <p className="text-right text-sm font-bold text-gray-700">{label}</p>
      <p className="mt-1 text-right text-gray-900">{value}</p>
    </div>
  )
}

