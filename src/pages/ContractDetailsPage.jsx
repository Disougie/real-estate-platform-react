import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apis } from '../api'

// Section Header Component
function SectionHeader({ titleAr, titleEn }) {
  return (
    <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
      <span className="text-sm font-medium tracking-wide">{titleEn}</span>
      <span className="text-lg font-bold">{titleAr}</span>
    </div>
  )
}

// Field Row Component
function FieldRow({ fields }) {
  return (
    <div className="flex flex-wrap border-b border-gray-200 last:border-b-0">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex-1 min-w-[200px] p-3 flex items-center justify-end gap-2"
        >
          <span className="border-b border-gray-300 flex-1 min-w-[80px]">
            {field.value || ''}
          </span>
          <span className="text-gray-700 font-medium whitespace-nowrap">
            {field.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ContractDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.contracts
      .getInitialContract({ id: Number(id) })
      .then((res) => {
        if (!alive) return
        setContract(res.data)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [id])

  const handleConfirm = () => {
    alert('تم تأكيد العقد بنجاح')
    navigate('/contracts')
  }

  const handleCancel = () => {
    navigate('/contracts')
  }

  return (
    <div className="min-h-screen">
      <Header activeNav="العقود المبدئية" />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
            جاري تحميل تفاصيل العقد...
          </div>
        )}

        {!loading && !contract && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
            لم يتم العثور على العقد
          </div>
        )}

        {!loading && contract && (
        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-xl">
          {/* Contract Data Section */}
          <div className="mb-1">
            <SectionHeader titleAr="بيانات العقد" titleEn="CONTRACT DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'حالة العقد:', value: contract.status || '—' },
                  { label: 'رقم سجل العقد:', value: String(contract.id ?? '—') },
                ]}
              />
              <FieldRow
                fields={[
                  { label: 'تاريخ الانشاء:', value: contract.created_at ? new Date(contract.created_at).toLocaleDateString('ar') : '—' },
                  { label: 'تاريخ الانتهاء:', value: contract.expire_at ? new Date(contract.expire_at).toLocaleDateString('ar') : '—' },
                ]}
              />
            </div>
          </div>

          {/* Lesser Data Section */}
          <div className="mb-1">
            <SectionHeader titleAr="بيانات المؤجر" titleEn="LESSER DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'البريد الالكتروني:', value: contract.owner_data?.email },
                  { label: 'الاسم:', value: contract.owner_data?.name },
                ]}
              />
              <FieldRow
                fields={[
                  { label: 'رقم الجوال:', value: contract.owner_data?.phone },
                  { label: '—', value: '' },
                ]}
              />
            </div>
          </div>

          {/* Tenant Data Section */}
          <div className="mb-1">
            <SectionHeader titleAr="بيانات المستأجر" titleEn="TENANT DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'البريد الالكتروني:', value: contract.seeker_data?.email },
                  { label: 'الاسم:', value: contract.seeker_data?.name },
                ]}
              />
              <FieldRow
                fields={[
                  { label: 'رقم الجوال:', value: contract.seeker_data?.phone },
                  { label: '—', value: '' },
                ]}
              />
            </div>
          </div>

          {/* Property Data Section */}
          <div className="mb-1">
            <SectionHeader titleAr="بيانات العقار" titleEn="PROPERTY DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'الغرض من إستخدام العقار:', value: contract.property_data?.purpose },
                  { label: 'الموقع:', value: contract.property_data?.location },
                ]}
              />
              <FieldRow
                fields={[
                  { label: 'المساحة:', value: contract.property_data?.size },
                  { label: '—', value: '' },
                ]}
              />
            </div>
          </div>

          {/* Financial Data Section */}
          <div>
            <SectionHeader titleAr="البيانات المالية" titleEn="FINANCIAL DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'قيمة الإيجار:', value: contract.financial_data?.rent_price },
                  { label: 'مدة الإيجار:', value: contract.financial_data?.rent_duration },
                ]}
              />
              <FieldRow
                fields={[
                  { label: 'المبلغ الكلي:', value: contract.financial_data?.overall_amount },
                  { label: '—', value: '' },
                ]}
              />
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
