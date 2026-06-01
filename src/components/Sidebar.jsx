import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyTabs from '../components/PropertyTabs'

const areas = ['اختر المنطقة', 'الدناقلة', 'المزاد', 'الصافية', 'الشعبية', 'كافوري', 'الحاج يوسف']
const cities = ['اختر المدينة', 'الخرطوم', 'بحري', 'ام درمان']
const cityToArea = {
  'الخرطوم': ['اختر المنطقة', 'الرياض', 'الطائف', 'اركويت', 'العمارات', 'السوق العربي', 'الصحافة', 'الخرطوم 2'],
  'بحري': ['اختر المنطقة', 'الدناقلة', 'المزاد', 'الصافية', 'الشعبية', 'كافوري', 'الحاج يوسف'],
  'ام درمان': ['اختر المنطقة', 'الموردة', 'بيت المال', 'امبدة', 'الثورة', 'صالحة', 'العرضة'],
  '': ['اختر المنطقة', 'الموردة', 'بيت المال', 'الرياض', 'الطائف', 'الصافية', 'الشعبية', 'كافوري'],
}

export default function Sidebar({ filters, setFilters, onSearch, onReset }) {
  const [activeTab, setActiveTab] = useState()
  const [areaOpen, setareaOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')

  const handleTypeChange = (type) => {
    setActiveTab(type);
    setFilters(prev => ({
      ...prev,
      type: type
    }));
  }

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

  const handleSizeIncrement = (field, amount = 10) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field] + amount
    }))
  }

  const handleSizeDecrement = (field, min = 0, amount = 10) => {
    setFilters(prev => ({
      ...prev,
      [field]: Math.max(prev[field] - amount, min)
    }))
  }

  return (
    <aside className="bg-gray-100 p-4 w-full lg:w-80 border-r border-gray-300" >
      <PropertyTabs activeTab={activeTab} handleTypeChange={handleTypeChange} />
      {/* Header */}
      <div className="flex items-center justify-between my-4">
        <span className="text-gray-700 font-medium">خيارات البحث</span>
        <button 
          className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={() => {setActiveTab(null); setSelectedCity(''); onReset()}}
        >
          إعادة ضبط
        </button>
      </div>

      {/* area & City */}
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
                      setSelectedCity(city)
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

        {/* area Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المنطقة</label>
          <div className="relative">
            <button
              onClick={() => setareaOpen(!areaOpen)}
              className="w-full px-3 py-2 border border-accent rounded bg-white text-right flex items-center justify-between"
            >
              <ChevronRight size={16} className="text-gray-500" />
              <span>{filters.area || 'اختر المنطقة'}</span>
            </button>
            {areaOpen && (
              <div className="absolute top-full right-0 left-0 bg-white border border-gray-300 rounded mt-1 z-10 shadow-lg">
                {cityToArea[selectedCity].map((area, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, area }))
                      setareaOpen(false)
                    }}
                    className={`w-full px-3 py-2 text-right hover:bg-accent hover:text-white transition-colors ${
                      filters.area === area ? 'bg-accent text-white' : ''
                    }`}
                  >
                    {area}
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
              onClick={() => handleDecrement('minRooms')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.minRooms}</span>
            <button 
              onClick={() => handleIncrement('minRooms')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleDecrement('maxRooms')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.maxRooms}</span>
            <button 
              onClick={() => handleIncrement('maxRooms')}
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
              onClick={() => handleDecrement('minBaths')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.minBaths}</span>
            <button 
              onClick={() => handleIncrement('minBaths')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleDecrement('maxBaths')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-8 text-center">{filters.maxBaths}</span>
            <button 
              onClick={() => handleIncrement('maxBaths')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">سعر العقار</label>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePriceDecrement('minPrice')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-16 text-center text-sm">{filters.minPrice}</span>
            <button 
              onClick={() => handlePriceIncrement('minPrice')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePriceDecrement('maxPrice')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-16 text-center text-sm">{filters.maxPrice}</span>
            <button 
              onClick={() => handlePriceIncrement('maxPrice')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Size Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">مساحة العقار</label>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleSizeDecrement('minSize')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-16 text-center text-sm">{filters.minSize}</span>
            <button 
              onClick={() => handleSizeIncrement('minSize')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-gray-600">إلى</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleSizeDecrement('maxSize')}
              className="p-1 border border-gray-400 rounded hover:bg-gray-200"
            >
              <ChevronRight size={16} />
            </button>
            <span className="w-16 text-center text-sm">{filters.maxSize}</span>
            <button 
              onClick={() => handleSizeIncrement('maxSize')}
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
