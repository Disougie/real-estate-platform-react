import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { MoreVertical } from 'lucide-react'
import { useEffect, useMemo, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { apis } from '../api'

function PropertyCard({ property }) {

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    // إضافة المستمع (Listener) عند فتح القائمة
    if (showMenu) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  const viewRemoveFromFavorites = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu)
  }

  const removeFromFavourit = async (e) => {
    e.preventDefault()
    try {
      const res = await apis.savedProperties.removeFromSaved(String(property.id))

      if(res.status == 204 || res.status == 200) {
        toast.success("تمت ازالة العقار من المفضلة")
        setShowMenu(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء الإزالة من المفضلة")
    }
  }


  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="bg-white border-2 border-primary rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative h-40 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 flex items-start gap-2 relative">
          <div className="flex-1 text-right">
            <h3 className="font-semibold text-gray-800 text-sm leading-relaxed">
              {property.title}
            </h3>
            <p className="text-gray-600 text-xs mt-1">{property.location}</p>
          </div>
          <button 
            className="text-gray-500 hover:text-primary mt-1"
            onClick={(e) => {
              e.preventDefault()
              viewRemoveFromFavorites(e)
              console.log("Remove")
            }}
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div 
              ref={menuRef}
              className='px-5 py-2 bg-white text-primary absolute shadow-sm hover:shadow-md left-0'
              onClick={removeFromFavourit}
            >
              ازالة من المفضلة
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function SavedPropertiesPage() {
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState([])

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.savedProperties
      .getMySavedProperties()
      .then((res) => {
        if (!alive) return
        setSaved(res.data || [])
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [])

 

  const savedProperties = useMemo(() => {
    return (saved || []).map((p) => ({
      id: p.id,
      title: p.title || 'بدون عنوان',
      location: `${p.city || ''}${p.area ? `, ${p.area}` : ''}`,
      image:
        (p.imagesUrls && p.imagesUrls[0]) ||
        '../assets/property default image.PNG',
    }))
  }, [saved])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="bg-white rounded-lg mb-8 border-r-4 border-primary">
          <h1 className="text-2xl font-bold text-primary py-4 px-6 text-right">
            العقارات المحفوظة
          </h1>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center text-gray-600">
            جاري تحميل العقارات المحفوظة...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                // showMenu={showMenu}
                // menuRef={menuRef}
                // viewRemoveFromFavorites={viewRemoveFromFavorites}
                // removeFromFavourit={removeFromFavourit}
              />
            ))}
          </div>
        )}

        {/* Empty State - shown when no properties */}
        {!loading && savedProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">لا توجد عقارات محفوظة</p>
            <Link 
              to="/home"
              className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              تصفح العقارات
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
