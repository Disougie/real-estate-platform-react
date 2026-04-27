import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom SVG icons for different property types
const createCustomIcon = (type) => {
  let svgContent = '';
  let color = '';
  
  switch (type) {
    case 'sale':
      // Orange triangle for properties for sale
      color = '#f97316';
      svgContent = `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 22,20 2,20" fill="${color}" stroke="#fff" stroke-width="2"/>
        </svg>
      `;
      break;
    case 'commercial':
      // Red square for commercial properties
      color = '#ef4444';
      svgContent = `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="16" fill="${color}" stroke="#fff" stroke-width="2"/>
        </svg>
      `;
      break;
    case 'rent':
      // Purple star for properties for rent
      color = '#a855f7';
      svgContent = `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="${color}" stroke="#fff" stroke-width="1.5"/>
        </svg>
      `;
      break;
    default:
      color = '#3b82f6';
      svgContent = `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="${color}" stroke="#fff" stroke-width="2"/>
        </svg>
      `;
  }

  return L.divIcon({
    html: svgContent,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Dummy property data for Khartoum/Sudan
const properties = [
  // Properties for sale (orange triangles)
  { id: 1, type: 'sale', position: [15.6177, 32.5252], title: 'فيلا فاخرة', price: '150,000,000 جنيه', location: 'الخرطوم بحري' },
  { id: 2, type: 'sale', position: [15.6220, 32.5180], title: 'بيت للبيع', price: '80,000,000 جنيه', location: 'كافوري' },
  { id: 3, type: 'sale', position: [15.6100, 32.5350], title: 'شقة واسعة', price: '45,000,000 جنيه', location: 'الخرطوم بحري' },
  { id: 4, type: 'sale', position: [15.6050, 32.5280], title: 'منزل حديث', price: '120,000,000 جنيه', location: 'الدناقلة' },
  
  // Commercial properties (red squares)
  { id: 5, type: 'commercial', position: [15.6150, 32.5320], title: 'مبنى تجاري', price: '500,000,000 جنيه', location: 'الخرطوم بحري' },
  { id: 6, type: 'commercial', position: [15.6080, 32.5400], title: 'محل تجاري', price: '200,000,000 جنيه', location: 'السوق المركزي' },
  { id: 7, type: 'commercial', position: [15.6200, 32.5380], title: 'مكتب للبيع', price: '180,000,000 جنيه', location: 'شارع النيل' },
  { id: 8, type: 'commercial', position: [15.6030, 32.5150], title: 'مستودع', price: '350,000,000 جنيه', location: 'المنطقة الصناعية' },
  
  // Properties for rent (purple stars)
  { id: 9, type: 'rent', position: [15.6130, 32.5220], title: 'شقة للإيجار', price: '500,000 جنيه/شهر', location: 'الخرطوم بحري' },
  { id: 10, type: 'rent', position: [15.6190, 32.5290], title: 'فيلا للإيجار', price: '1,200,000 جنيه/شهر', location: 'كافوري' },
  { id: 11, type: 'rent', position: [15.6070, 32.5330], title: 'مكتب للإيجار', price: '300,000 جنيه/شهر', location: 'وسط المدينة' },
  { id: 12, type: 'rent', position: [15.6250, 32.5200], title: 'شقة مفروشة', price: '800,000 جنيه/شهر', location: 'الخرطوم بحري' },
  { id: 13, type: 'rent', position: [15.6160, 32.5150], title: 'غرفة للإيجار', price: '150,000 جنيه/شهر', location: 'جزيرة توتي' },
  { id: 14, type: 'rent', position: [15.6090, 32.5250], title: 'بيت للإيجار', price: '900,000 جنيه/شهر', location: 'الصافية' },
];

// Selection circle center (matching the image)
const selectionCenter = [15.6150, 32.5280];
const selectionRadius = 1500; // meters

// Map bounds setter component
function SetMapBounds() {
  const map = useMap();
  
  useEffect(() => {
    // Set bounds to show all markers
    const bounds = L.latLngBounds(properties.map(p => p.position));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map]);
  
  return null;
}

export default function PropertyMap({ filters = {} }) {
  // Filter properties based on type filter
  const filteredProperties = filters.type 
    ? properties.filter(p => p.type === filters.type)
    : properties;

  return (
    <MapContainer
      center={[15.6150, 32.5280]}
      zoom={14}
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Selection circle */}
      <Circle
        center={selectionCenter}
        radius={selectionRadius}
        pathOptions={{
          color: '#0891b2',
          fillColor: '#67e8f9',
          fillOpacity: 0.3,
          weight: 2,
        }}
      />
      
      {/* Property markers */}
      {filteredProperties.map((property) => (
        <Marker
          key={property.id}
          position={property.position}
          icon={createCustomIcon(property.type)}
        >
          <Popup>
            <div className="text-right p-2 min-w-[200px]" dir="rtl">
              <h3 className="font-bold text-lg text-primary mb-1">{property.title}</h3>
              <p className="text-accent font-semibold mb-1">{property.price}</p>
              <p className="text-gray-600 text-sm">{property.location}</p>
              <button className="mt-2 w-full bg-primary text-white py-1 px-3 rounded text-sm hover:bg-primary/90 transition-colors">
                عرض التفاصيل
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <SetMapBounds />
    </MapContainer>
  );
}
