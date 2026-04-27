import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyTabs from '../components/PropertyTabs'

const regions = ['اختر المنطقة', 'الدناقلة', 'الصيافي', 'المزاد', 'الصافية', 'الشعبية']
const cities = ['اختر المدينة', 'الخرطوم', 'بحري', 'امدرمان', 'الجيلي', 'الكلاكلة']

export default function Sidebar({ filters, setFilters, onSearch }) {
  const [activeTab, setActiveTab] = useState('buy')
  const [regionOpen, setRegionOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)

  const handleIncrement = (field, max = 10) => {
    setFilters(prev => ({
      ...prev,
      [field]: Math.min(prev[field] + 1, max)
    }))
  }

  const handleDecrement = (field, min = 0) => {
    setFilters(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - 1, min)
    }))
  }

  const handlePriceIncrement = (field, amount = 500000) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field] + amount
    }))
  }

  const handlePriceDecrement = (field, min = 0, amount = 500000) => {
    setFilters(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - amount, min)
    }))
  }

  return (
    <aside className="bg-gray-100 p-4 w-full lg:w-80 border-r border-gray-300">
      <PropertyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Header */}
      <div className="flex items-center justify-between my-4">
        <button className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-200 transition-colors">
          إعادة ضبط
        </button>
        <span className="text-gray-700 font-medium">خيارات البحث</span>
      </div>

      {/* Region & City */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* City Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المدينة</label>
          <div className="relative">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-right flex items-center justify-between"
            >
              <ChevronRight size={16} className="text-gray-500" />
              <span>{filters.city || 'اختر المدينة'}</span>
            </button>
            {cityOpen && (
              <div className="absolute top-full right-0 left-0 bg-white border border-gray-300 rounded mt-1 z-10 shadow-lg">
                {cities.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, city }))
                      setCityOpen(false)
                    }}
                    className={`w-full px-3 py-2 text-right hover:bg-accent hover:text-white transition-colors ${
                      filters.city === city ? 'bg-accent text-white' : ''
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Region Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المنطقة</label>
          <div className="relative">
            <button
              onClick={() => setRegionOpen(!regionOpen)}
              className="w-full px-3 py-2 border border-accent rounded bg-white text-right flex items-center justify-between"
            >
              <ChevronRight size={16} className="text-gray-500" />
              <span>{filters.region || 'اختر المنطقة'}</span>
            </button>
            {regionOpen && (
              <div className="absolute top-full right-0 left-0 bg-white border border-gray-300 rounded mt-1 z-10 shadow-lg">
                {regions.map((region, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, region }))
                      setRegionOpen(false)
                    }}
                    className={`w-full px-3 py-2 text-right hover:bg-accent hover:text-white transition-colors ${
                      filters.region === region ? 'bg-accent text-white' : ''
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Number of Rooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">عدد الغرف</label>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleDecrement('roomsMax')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.roomsMax}</span>
            <button 
              onClick={() => handleIncrement('roomsMax')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleDecrement('roomsMin')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.roomsMin}</span>
            <button 
              onClick={() => handleIncrement('roomsMin')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Number of Bathrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">عدد الحمامات</label>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleDecrement('bathroomsMax')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.bathroomsMax}</span>
            <button 
              onClick={() => handleIncrement('bathroomsMax')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleDecrement('bathroomsMin')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.bathroomsMin}</span>
            <button 
              onClick={() => handleIncrement('bathroomsMin')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">سعر العقار</label>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePriceDecrement('priceMax')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-16 text-center text-sm">{filters.priceMax.toLocaleString()}</span>
            <button 
              onClick={() => handlePriceIncrement('priceMax')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePriceDecrement('priceMin')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-16 text-center text-sm">{filters.priceMin.toLocaleString()}</span>
            <button 
              onClick={() => handlePriceIncrement('priceMin')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button 
        onClick={onSearch}
        className="w-full py-2 bg-white border border-gray-400 rounded text-gray-700 font-medium hover:bg-gray-100 transition-colors"
      >
        بحث
      </button>
    </aside>
  )
}
