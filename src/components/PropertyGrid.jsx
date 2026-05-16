import { useEffect, useMemo, useState } from 'react'
import { apis } from '../api'
import PropertyCard from './PropertyCard'
import PropertyDefaultImage from '../../assets/property default image.PNG'

export default function PropertyGrid({loading, data}) {
  // const [page, setPage] = useState(0)
  // const [size] = useState(12)
  // const [loading, setLoading] = useState(true)
  // const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 })

  // useEffect(() => {
  //   let alive = true
  //   setLoading(true)
  //   apis.properties
  //     .getProperties({ page, size })
  //     .then((res) => {
  //       if (!alive) return
  //       setData(res.data || { content: [], totalPages: 0, totalElements: 0 })
  //     })
  //     .finally(() => {
  //       if (alive) setLoading(false)
  //     })

  //   return () => {
  //     alive = false
  //   }
  // }, [page, size])

  const properties = useMemo(() => {
    const content = data?.content || []
    return content.map((p) => ({
      id: p.id,
      title: p.title || 'بدون عنوان',
      location: p.area || '',
      image:
        p.imageUrl ||
        PropertyDefaultImage,
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
    </div>
  )
}
