import { MoreVertical } from 'lucide-react'
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { apis } from '../api'

export default function PropertyCard({ property }) {

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
  
  const viewAddingToFavorites = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu)
  }

  const addToFavourit = async (e) => {
    e.preventDefault()
    const res = await apis.savedProperties.saveProperty({
      property_id: String(property.id),
    })

    if(res.status == 201)
      alert("تمت اضافة العقار الى المفضلة")
  }


  return (
    <Link 
      to={`/property/${property.id}`}
      className="block bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex items-start gap-2 relative">
        
        <div className="flex-1 text-right">
          <h3 className="font-medium text-gray-800 text-sm leading-relaxed">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm">{property.location}</p>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 mt-1"
          onClick={(e) => viewAddingToFavorites(e)}
        >
          <MoreVertical size={18} />
        </button>
        {showMenu && (
          <div 
            ref={menuRef}
            className='px-5 py-2 bg-white text-primary absolute shadow-sm hover:shadow-md left-0'
            onClick={addToFavourit}
          >
            اضافة الى المفضلة
          </div>
        )}
      </div>
    </Link>
  )
}
