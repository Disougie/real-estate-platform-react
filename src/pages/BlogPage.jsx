import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { apis } from '../api'

export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.blogs
      .getBolgs()
      .then((res) => {
        if (!alive) return
        setBlogs(res.data || [])
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header activeNav="المدونة" />

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 border-r-4 border-primary bg-white">
          <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
            المدونة
          </h1>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-600">
            جاري تحميل المقالات...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog, idx) => (
              <article
                key={`${blog.title || 'blog'}-${idx}`}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <h2 className="mb-3 text-right text-2xl font-bold text-primary">
                  {blog.title || 'بدون عنوان'}
                </h2>
                <p className="text-right leading-8 text-gray-700">
                  {blog.content || '—'}
                </p>
              </article>
            ))}

            {blogs.length === 0 && (
              <div className="rounded-xl bg-white p-6 text-center text-gray-600 md:col-span-2">
                لا توجد مقالات
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
