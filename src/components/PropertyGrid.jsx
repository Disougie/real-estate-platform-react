import { useEffect, useMemo, useState } from 'react'
import { apis } from '../api'
import PropertyCard from './PropertyCard'

export default function PropertyGrid() {
  const [page, setPage] = useState(0)
  const [size] = useState(12)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 })

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.properties
      .getProperties({ page, size })
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

  const properties = useMemo(() => {
    const content = data?.content || []
    return content.map((p) => ({
      id: p.id,
      title: p.title || 'بدون عنوان',
      location: p.area || '',
      image:
        p.imageUrl ||
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    }))
  }, [data])

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-gray-600">
        جاري تحميل العقارات...
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4">
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
    </div>
  )
}
