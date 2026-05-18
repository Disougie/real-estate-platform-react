import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { MoreVertical } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { apis } from '../api'

function PropertyCard({ property }) {
  return (
    <Link to={`/owner-property-details//${property.id}`} className="block">
      <div className="bg-white border-2 border-primary rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative h-40 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 flex items-start gap-2">
          <div className="flex-1 text-right">
            <h3 className="font-semibold text-gray-800 text-sm leading-relaxed">
              {property.title}
            </h3>
            <p className="text-gray-600 text-xs mt-1">{property.location}</p>
          </div>
          {/* <button 
            className="text-gray-500 hover:text-primary mt-1"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <MoreVertical size={18} />
          </button> */}
        </div>
      </div>
    </Link>
  )
}

export default function MyPropertiesPage() {
  const [loading, setLoading] = useState(true)
  const [raw, setRaw] = useState([])

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.properties
      .getMyProperties()
      .then((res) => {
        if (!alive) return
        setRaw(res.data || [])
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [])

  const myProperties = useMemo(() => {
    return (raw || []).map((p) => ({
      id: p.id,
      title: p.title || 'بدون عنوان',
      location: `${p.location?.city || ''}${p.location?.area ? `, ${p.location.area}` : ''}`,
      image:
        (p.images && p.images[0]?.imageUrl) ||
        '/PropertyDefaultImage.png',
    }))
  }, [raw])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="bg-white rounded-lg mb-8 border-r-4 border-primary">
          <h1 className="text-2xl font-bold text-primary py-4 px-6 text-right">
            العقارات خاصتي
          </h1>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-600">
            جاري تحميل العقارات...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Empty State - shown when no properties */}
        {!loading && myProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">لا توجد عقارات مضافة</p>
            <Link
              to="/add-property"
              className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              إضافة عقار جديد
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
