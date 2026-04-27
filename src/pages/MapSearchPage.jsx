import { useState } from 'react';
import Header from '../components/Header';
import PropertyMap from '../components/PropertyMap';

const legendItems = [
  { type: 'sale', label: 'عقار للشراء', color: '#f97316', shape: 'triangle' },
  { type: 'commercial', label: 'عقار تجاري', color: '#ef4444', shape: 'square' },
  { type: 'rent', label: 'عقار للإيجار', color: '#a855f7', shape: 'star' },
];

function LegendShape({ shape, color }) {
  switch (shape) {
    case 'triangle':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="12,4 20,20 4,20" fill={color} stroke="#fff" strokeWidth="1"/>
        </svg>
      );
    case 'square':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" fill={color} stroke="#fff" strokeWidth="1"/>
        </svg>
      );
    case 'star':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon 
            points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" 
            fill={color} 
            stroke="#fff" 
            strokeWidth="1"
          />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill={color} stroke="#fff" strokeWidth="1"/>
        </svg>
      );
  }
}

export default function MapSearchPage() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (type) => {
    setActiveFilter(activeFilter === type ? null : type);
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <Header activeNav="بحث الخرائط" />
      
      <div className="relative h-[calc(100vh-80px)]">
        {/* Map Container */}
        <div className="absolute inset-0">
          <PropertyMap filters={activeFilter ? { type: activeFilter } : {}} />
        </div>
        
        {/* Legend Panel */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000] min-w-[200px]">
          <div className="space-y-3">
            {legendItems.map((item) => (
              <button
                key={item.type}
                onClick={() => handleFilterClick(item.type)}
                className={`
                  flex items-center justify-between w-full p-2 rounded-lg transition-all
                  ${activeFilter === item.type 
                    ? 'bg-gray-100 ring-2 ring-primary' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-gray-700 font-medium">{item.label}</span>
                <LegendShape shape={item.shape} color={item.color} />
              </button>
            ))}
          </div>
          
          {activeFilter && (
            <button
              onClick={() => setActiveFilter(null)}
              className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              إظهار الكل
            </button>
          )}
        </div>
        
        {/* Search Controls */}
        <div className="absolute bottom-4 right-4 left-4 md:right-auto md:left-auto md:w-96 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ابحث عن موقع..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-right"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Zoom Controls Info */}
        <div className="absolute bottom-20 left-4 z-[1000] hidden md:block">
          <div className="bg-white rounded-lg shadow-lg p-3 text-sm text-gray-600 text-right">
            <p>استخدم الماوس للتكبير والتصغير</p>
            <p>اضغط على العلامة لعرض التفاصيل</p>
          </div>
        </div>
      </div>
    </div>
  );
}
