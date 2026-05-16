import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { apis } from '../api';

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

  // Mapping API types to visual shapes
  if (type === 'PURCHASE') {
    color = '#f97316'; // orange triangle
    svgContent = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 22,20 2,20" fill="${color}" stroke="#fff" stroke-width="2"/>
      </svg>
    `;
  } else if (type === 'COMMERCIAL_RENT' || type === 'COMMERCIAL_PURCHASE') {
    color = '#ef4444'; // red square
    svgContent = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" fill="${color}" stroke="#fff" stroke-width="2"/>
      </svg>
    `;
  } else if (type === 'RENT' || type === 'STUDENT') {
    color = '#a855f7'; // purple star
    svgContent = `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      </svg>
    `;
  } else {
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

const createTargetIcon = () => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <span class="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50 animate-ping"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-cyan-600 border-2 border-white"></span>
      </div>
    `,
    className: 'custom-target-marker bg-transparent',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

// Selection radius (meters)
const selectionRadius = 10000; // 10 kilometers

const getLatLng = (pos) => {
  if (!pos || pos.length < 2) return [15.6150, 32.5280]; // fallback
  const lat = pos[0] < pos[1] ? pos[0] : pos[1];
  const lng = pos[0] > pos[1] ? pos[0] : pos[1];
  return [lat, lng];
};

// Sub-component to handle map events
function MapEvents({ onLocationSelected }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelected(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom(), { animate: true });
    },
  });
  return null;
}

// Map bounds setter component
function SetMapBounds({ properties, searchCenter }) {
  const map = useMap();

  useEffect(() => {
    if (properties && properties.length > 0) {
      const positions = properties.map(p => getLatLng(p.position));
      if (searchCenter) positions.push(searchCenter);
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (searchCenter) {
      map.setView(searchCenter, 14);
    }
  }, [map, properties, searchCenter]);

  return null;
}

export default function PropertyMap({ filters = {} }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCenter, setSearchCenter] = useState(null);

  const fetchProperties = useCallback(async (lat, lng) => {
    setLoading(true);
    const toastId = toast.loading('جاري البحث عن العقارات...');
    try {
      // API expects (lng, lat, maxDistance)
      const response = await apis.properties.searchByCoordinates(lng, lat, 10);
      setProperties(response.data || []);
      toast.success('تم جلب العقارات بنجاح', { id: toastId });
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('حدث خطأ أثناء البحث عن العقارات', { id: toastId });
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setSearchCenter([lat, lng]);
          fetchProperties(lat, lng);
        },
        (error) => {
          console.warn('Geolocation denied or failed, using fallback.', error);
          // Fallback to Khartoum Center
          const fallbackLat = 15.6150;
          const fallbackLng = 32.5280;
          setSearchCenter([fallbackLat, fallbackLng]);
          fetchProperties(fallbackLat, fallbackLng);
          toast('تم استخدام الموقع الافتراضي. يمكنك الضغط على الخريطة للبحث.', { icon: 'ℹ️' });
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      // Fallback if geolocation is not supported
      const fallbackLat = 15.6150;
      const fallbackLng = 32.5280;
      setSearchCenter([fallbackLat, fallbackLng]);
      fetchProperties(fallbackLat, fallbackLng);
    }
  }, [fetchProperties]);

  const handleLocationSelected = (lat, lng) => {
    setSearchCenter([lat, lng]);
    fetchProperties(lat, lng);
  };

  // Filter properties based on the frontend legend filters ('sale', 'commercial', 'rent')
  const filteredProperties = properties.filter(p => {
    if (!filters.type) return true;
    if (filters.type === 'sale' && p.type === 'PURCHASE') return true;
    if (filters.type === 'commercial' && (p.type === 'COMMERCIAL_RENT' || p.type === 'COMMERCIAL_PURCHASE')) return true;
    if (filters.type === 'rent' && (p.type === 'RENT' || p.type === 'STUDENT')) return true;
    return false;
  });

  if (!searchCenter) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <MapContainer
      center={searchCenter}
      zoom={14}
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapEvents onLocationSelected={handleLocationSelected} />

      {/* Target Marker for User Location / Clicked Location */}
      <Marker position={searchCenter} icon={createTargetIcon()}>
        <Popup>
          <div className="text-center font-bold text-gray-800" dir="rtl">
            نطاق البحث (10 كم)
          </div>
        </Popup>
      </Marker>

      {/* Selection circle */}
      <Circle
        center={searchCenter}
        radius={selectionRadius}
        pathOptions={{
          color: '#0891b2',
          fillColor: '#67e8f9',
          fillOpacity: 0.1,
          weight: 2,
        }}
      />

      {/* Property markers */}
      {filteredProperties.map((property) => {
        const [lat, lng] = getLatLng(property.position);

        return (
          <Marker
            key={property.id}
            position={[lat, lng]}
            icon={createCustomIcon(property.type)}
          >
            <Popup>
              <div className="text-right p-2 min-w-[200px]" dir="rtl">
                <h3 className="font-bold text-lg text-black mb-1">{property.title}</h3>
                <p className="text-accent font-semibold mb-1">
                  {new Intl.NumberFormat('ar-SD', { style: 'currency', currency: 'SDG', maximumFractionDigits: 0 }).format(property.price)}
                </p>
                <p className="text-gray-600 text-sm">{property.location}</p>
                <Link to={`/property/${property.id}`} className="block mt-3 w-full bg-primary text-white text-center py-1.5 px-3 rounded text-sm hover:bg-primary/90 transition-colors">
                  عرض التفاصيل
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}

      <SetMapBounds properties={filteredProperties} searchCenter={searchCenter} />
    </MapContainer>
  );
}
