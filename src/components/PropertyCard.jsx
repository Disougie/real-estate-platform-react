import { MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PropertyCard({ property }) {
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
      <div className="p-3 flex items-start gap-2">
        
        <div className="flex-1 text-right">
          <h3 className="font-medium text-gray-800 text-sm leading-relaxed">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm">{property.location}</p>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 mt-1"
          onClick={(e) => e.preventDefault()}
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </Link>
  )
}
