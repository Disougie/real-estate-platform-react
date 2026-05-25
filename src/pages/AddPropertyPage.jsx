import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Header from '../components/Header'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { apis } from '../api'
import { http } from '../api/http'
import { useNavigate } from 'react-router-dom'

const propertyTypes = [
  { label: 'سكني', value: 'سكني' },
  { label: 'تجاري', value: 'تجاري' },
]
const propertyPurposes = ['للبيع', 'للإيجار']

const initialForm = {
  title: '',
  description: '',
  type: '',
  purpose: '',
  price: '',
  city: '',
  rooms: '',
  bathrooms: '',
  area: '',
  size: '',
  latitude: '',
  longitude: '',
}

const inputClassName =
  'w-full rounded bg-white px-3 py-2 text-right text-gray-800 outline-none ring-1 ring-gray-300 transition focus:ring-2 focus:ring-accent'

const khartoumCenter = [15.5007, 32.5599]

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function AddPropertyPage() {
  const [formData, setFormData] = useState(initialForm)
  const [images, setImages] = useState([])
  const [isMapOpen, setIsMapOpen] = useState(false)
  const navegate = useNavigate();

  const previewUrls = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images],
  )

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || [])
    setImages(files.slice(0, 5))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.latitude || !formData.longitude) {
      toast.error('يرجى تحديد موقع العقار على الخريطة')
      return
    }

    const isCommercial = formData.type === 'تجاري'
    const isRent = formData.purpose === 'للإيجار'

    const apiType = isCommercial
      ? isRent
        ? 'COMMERCIAL_RENT'
        : 'COMMERCIAL_PURCHASE'
      : isRent
        ? 'RENT'
        : 'PURCHASE'

    const payload = {
      title: formData.title,
      price: Number(formData.price || 0),
      type: apiType,
      lng: Number(formData.longitude),
      lat: Number(formData.latitude),
      description: formData.description,
      rooms: Number(formData.rooms || 0),
      baths: Number(formData.bathrooms || 0),
      // images,
      city: formData.city,
      area: formData.area,
      size: Number(formData.size || 0),
    }

    try {
      const res = await apis.properties.addPropertyAd({ ...payload })
      // const res = await http.post('/api/v1/properties', payload, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      if (res.status == 201 || res.status == 200) {
        Swal.fire({
          title: 'نجاح!',
          text: 'تم إضافة العقار بنجاح',
          icon: 'success',
          confirmButtonColor: '#1e3a8a'
        })
        navegate('/my-properties');
      }
      else {
        throw new Error("something went wrong")
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'حدث خطأ أثناء إضافة العقار'
      toast.error(errorMsg)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-6" dir='ltr'>
        <div className="mb-8 bg-white border-r-4 border-primary">
          <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
            إضافة عقار
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-5xl rounded-xl bg-primary px-6 py-8 md:px-10"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3" dir='rtl'>
            <Field label="نوع العقار">
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className={inputClassName}
                required
              >
                <option value="">اختر النوع</option>
                {propertyTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="الغرض منه">
              <select
                value={formData.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                className={inputClassName}
                required
              >
                <option value="">اختر الغرض</option>
                {propertyPurposes.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="قيمة العقار">
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={inputClassName}
                required
              />
            </Field>

            <Field label="موقع العقار على الخريطة">
              <button
                type="button"
                onClick={() => setIsMapOpen((prev) => !prev)}
                className={inputClassName}
              >
                {formData.latitude && formData.longitude
                  ? 'تم تحديد الموقع'
                  : 'اضغط للتحديد'}
              </button>
            </Field>

            <Field label="المدينة">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className={inputClassName}
                required
              />
            </Field>

            <Field label="الحي">
              <input
                type="text"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                className={inputClassName}
                required
              />
            </Field>

            <Field label="عدد الغرف">
              <input
                type="number"
                min="0"
                value={formData.rooms}
                onChange={(e) => handleChange('rooms', e.target.value)}
                className={inputClassName}
                required
              />
            </Field>

            <Field label="عدد الحمامات">
              <input
                type="number"
                min="0"
                value={formData.bathrooms}
                onChange={(e) => handleChange('bathrooms', e.target.value)}
                className={inputClassName}
                required
              />
            </Field>

            <Field label="مساحة العقار">
              <input
                type="number"
                min="0"
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
                className={inputClassName}
                required
              />
            </Field>
          <Field label="عنوان الاعلان">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClassName}
              required
            />
          </Field>

          <Field label="الوصف">
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={inputClassName}
              required
            ></textarea>
          </Field>
          </div>


          {isMapOpen && (
            <div className="mt-6 rounded-lg bg-white p-4">
              <p className="mb-3 text-right text-sm font-medium text-gray-700">
                اضغط على الخريطة لتحديد موقع العقار
              </p>
              <div className="h-80 overflow-hidden rounded-lg">
                <MapContainer
                  center={
                    formData.latitude && formData.longitude
                      ? [Number(formData.latitude), Number(formData.longitude)]
                      : khartoumCenter
                  }
                  zoom={13}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapLocationPicker
                    position={
                      formData.latitude && formData.longitude
                        ? [Number(formData.latitude), Number(formData.longitude)]
                        : null
                    }
                    onPick={(lat, lng) => {
                      handleChange('latitude', lat.toFixed(6))
                      handleChange('longitude', lng.toFixed(6))
                    }}
                  />
                </MapContainer>
              </div>
              <div className="mt-3 flex flex-wrap justify-end gap-2 text-sm text-gray-700">
                <span className="rounded bg-gray-100 px-3 py-1">
                  خط الطول: {formData.longitude || '—'}
                </span>
                <span className="rounded bg-gray-100 px-3 py-1">
                  خط العرض: {formData.latitude || '—'}
                </span>
              </div>
            </div>
          )}

          {/* <div className="mt-6">
            <label className="mb-3 block text-right text-2xl font-bold text-white">
              صور العقار
            </label>

            <div className="flex flex-wrap items-center gap-3" dir='rtl'>
              {previewUrls.slice(0, 4).map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt={`صورة العقار ${index + 1}`}
                  className="h-24 w-32 rounded object-cover ring-2 ring-white/25"
                />
              ))}

              <label className="cursor-pointer rounded bg-secondary px-5 py-3 text-white transition-colors hover:bg-secondary/90">
                اختر صور
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div> */}

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="rounded bg-secondary px-12 py-3 text-3xl font-bold text-white transition-colors hover:bg-secondary/90"
            >
              أضف العقار
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex items-center gap-3">
      <label className="min-w-[120px] text-right text-xl font-bold text-white">
        {label}:
      </label>
      {children}
    </div>
  )
}

function MapLocationPicker({ position, onPick }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng
      onPick(lat, lng)
    },
  })

  if (!position) {
    return null
  }

  return <Marker position={position} />
}
