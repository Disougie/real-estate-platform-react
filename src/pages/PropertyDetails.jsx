import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { apis } from '../api'
// import BookingIcon from '../../assets/BookingIcon.png'

function PropertyDetails() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState()
  const [loading, setLoading] = useState(true)
  const [property, setProperty] = useState(null)
  const navigation = useNavigate();

  useEffect(() => {
    const start = new Date().getMilliseconds();
    let alive = true
    setLoading(true)
    apis.properties
      .getProperty(String(id))
      .then((res) => {
        if (!alive) return
        setProperty(res.data)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    const end = new Date().getMilliseconds();
    console.log(`fetch duration = ${end - start}ms`);

    return () => {
      alive = false
    }
  }, [id])

  useEffect(() => {
    apis.savedProperties.getMySavedProperties().then(res => {
      if (res.data.some(p => p.id == id)) {
        setIsFavorite(true);
      }
      else {
        setIsFavorite(false);
      }
    })
  }, [property])

  const images = useMemo(() => {
    const urls = property?.imagesUrls || []
    if (urls.length) return urls
    return [
      '/PropertyDefaultImage.png',
    ]
  }, [property])

  const handleAddToFavotrit = async () => {
    if (!isFavorite) {
      const res = await apis.savedProperties.saveProperty({ property_id: property.id });
      if (res.status == 201)
        setIsFavorite(true);
    }
    else {
      const res = await apis.savedProperties.removeFromSaved({ property_id: property.id });
      if (res.status == 204) {
        setIsFavorite(false);
      }
    }
  }

  const handleReservation = (propertyId) => {
    navigation(`/contracts/create/${propertyId}`)
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading && (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
            جاري تحميل تفاصيل العقار...
          </div>
        )}

        {!loading && !property && (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
            لم يتم العثور على العقار
          </div>
        )}

        {!loading && property && (
          <>
            {/* Image Gallery with Modern Grid */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
              {/* Main Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={property.title || 'عقار'}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedImage === index
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100">
                {images.slice(1).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index + 1)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-300 ${selectedImage === index + 1
                      ? 'ring-3 ring-primary ring-offset-2'
                      : 'hover:opacity-80'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`صورة ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index + 1 && (
                      <div className="absolute inset-0 bg-primary/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Price */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {(property.price || 0).toLocaleString()} جنيه
                    </p>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.features?.rooms ?? '—'} غرف
                    </p>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 12h16M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M4 12V6a2 2 0 0 1 2-2h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="9" cy="6" r="2" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.features?.baths ?? '—'} حمامات
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z" strokeWidth="2" />
                      <circle cx="12" cy="9" r="3" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.city || ''}{property.area ? `, ${property.area}` : ''}
                    </p>
                  </div>
                </div>

                {/* Area */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3v18h18M3 9h6v12M9 3v6h12M21 3v18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 12l4 4M16 12l-4 4" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {property.features?.size ?? '—'} متر مربع
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">النوع:</span>
                  <span className="text-gray-900 font-bold">{property.type || '—'}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">الحالة:</span>
                  <span className="text-gray-900 font-bold">{property.status || '—'}</span>
                </div>

                <div className="py-3">
                  <span className="text-gray-600 font-medium block mb-2">الوصف:</span>
                  <p className="text-gray-700 leading-relaxed">{property.decription || '—'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                اتصال
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button> */}

              <button
                onClick={handleAddToFavotrit}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-primary border-2 border-primary hover:bg-primary/5'
                  }`}
              >
                اضافة للمفضلة
                <svg
                  className="w-6 h-6"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                onClick={() => handleReservation(id)}
              >
                طلب الحجز
                <img src='/BookingIcon.png' alt="" className='w-[30px]' />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default PropertyDetails
