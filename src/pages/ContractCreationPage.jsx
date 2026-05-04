import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apis } from '../api'

// Section Header Component
function SectionHeader({ titleAr, titleEn }) {
  return (
    <div className="bg-primary text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
      <span className="text-lg font-bold">{titleAr}</span>
      <span className="text-sm font-medium tracking-wide">{titleEn}</span>
    </div>
  )
}

// Field Row Component
function FieldRow({ fields, rentDuration ,setRentDuration, setOverallAmount, propertyPrice}) {
  const handleRentDurationChange = (e) => {
    setRentDuration(e.target.value)
    setOverallAmount(Number(e.target.value) * propertyPrice)
  }
  return (
    <div className="flex flex-wrap border-b border-gray-200 last:border-b-0">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex-1 min-w-[200px] p-3 flex items-center justify-end gap-2"
        >
          <span className="text-gray-700 font-medium whitespace-nowrap">
            {field.label}
          </span>
          {field.label == '(بالشهور)مدة الإيجار:' && (
            <input 
              type='number' 
              value={rentDuration} 
              className="border-b border-gray-300 flex-1 min-w-[80px] text-center" 
              onChange={(e) => handleRentDurationChange(e)}
            />
          )}
          {field.label != '(بالشهور)مدة الإيجار:' && (
            <span className="border-b border-gray-300 flex-1 min-w-[80px] text-center">
              {field.value || ''}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ContractDetailsPage() {
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [property, setProperty] = useState(null)
  const [rentDuration, setRentDuration] = useState(null);
  const [overallAmount, setOverallAmount] = useState();

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.properties
      .getProperty(String(propertyId))
      .then((res) => {
        if (!alive) return
        setProperty(res.data)
        setOverallAmount(res.data.price)
        res.data.type == 'RENT' ? setRentDuration(1) : setRentDuration(null);
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [propertyId])

  const handleConfirm = async () => {
    const res = await apis.contracts.createInitialContract({
      property_id : propertyId,
      rentDuration
    });
    if(res.status == 201) {
      alert("contract created successfuly")
      navigate('/contracts')
    }
    else {
      alert("something went wrong")
      navigate("/home")
    }
  }

  const handleCancel = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen">
      <Header/>
      
      <main className="max-w-3xl mx-auto px-4 py-8" >

        {loading && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
            جاري تحميل تفاصيل الججز...
          </div>
        )}

        {!loading && !property && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
            لم يتم العثور على العقار
          </div>
        )}

        {!loading && property && (

        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-2xl">

          Property Data Section
          <div className="mb-1">
            <SectionHeader titleAr="بيانات العقار" titleEn="PROPERTY DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'الموقع:', value: `${property.location.city } ,${property.location.area}` },
                  { label: 'الغرض من إستخدام العقار:', value: property.type },
                ]}
              />
              <FieldRow
                fields={[
                  { label: 'المساحة:', value: property.features.size },
                  { label: '—', value: '' },
                ]}
              />
            </div>
          </div>

          {/* Financial Data Section */}
          <div>
            <SectionHeader titleAr="البيانات المالية" titleEn="FINANCIAL DATA" />
            <div className="bg-white">
              {property?.type == 'RENT' && (
                <FieldRow
                  fields={[
                    { label: 'قيمة الإيجار:', value: property.price || '—' },
                    { label: '(بالشهور)مدة الإيجار:', value: rentDuration || '—' },
                  ]}
                  rentDuration={rentDuration}
                  setRentDuration={setRentDuration}
                  setOverallAmount={setOverallAmount}
                  propertyPrice={property.price}
                />
              )}

              <div className="flex flex-wrap border-b border-gray-200 last:border-b-0">
                  <div className="flex-1 min-w-[200px] p-3 flex items-center justify-end gap-2" >
                    <span className="text-gray-700 font-medium whitespace-nowrap">
                      'المبلغ الكلي:'
                    </span>
                    <span className="border-b border-gray-300 flex-1 min-w-[80px] text-center">
                      {overallAmount}
                    </span>
                  </div>
              </div>

              
            </div>
          </div>
        </div>

        )}
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleConfirm}
            className="px-12 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors text-lg"
          >
            تأكيد
          </button>
          <button
            onClick={handleCancel}
            className="px-12 py-3 bg-white text-red-500 font-bold rounded-lg border-2 border-red-500 hover:bg-red-50 transition-colors text-lg"
          >
            إلغاء
          </button>
        </div>
      </main>
    </div>
  )
}
