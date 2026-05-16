import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
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
function FieldRow({ fields }) {
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
          <span className="border-b border-gray-300 flex-1 min-w-[80px] text-center">
            {field.value || ''}
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
      .getInitialContract(Number(id))
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

  const handleConfirm = async () => {
    try {
      const res = await apis.contracts.acceptContract(Number(id));
      if(res.status == 204 || res.status == 200) {
        toast.success('تم تأكيد العقد بنجاح')
        navigate('/contracts')
      } else {
        toast.error('حدث خطأ أثناء تأكيد العقد')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'حدث خطأ أثناء تأكيد العقد')
    }
  }
  
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذا الإجراء!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#1e3a8a',
      confirmButtonText: 'نعم، قم بالإلغاء',
      cancelButtonText: 'تراجع'
    });

    if (result.isConfirmed) {
      try {
        const res = await apis.contracts.rejectContract(Number(id));
        if(res.status == 204 || res.status == 200) {
          toast.success('تم الغاء العقد بنجاح')
          navigate('/contracts')
        } else {
          toast.error('حدث خطأ أثناء إلغاء العقد')
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'حدث خطأ أثناء إلغاء العقد')
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Header activeNav="العقود المبدئية" />
      
      <main className="max-w-3xl mx-auto px-4 py-8" >
        {loading && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
            جاري تحميل تفاصيل الحجز...
          </div>
        )}

        {!loading && !contract && (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow">
            لم يتم العثور على العقد
          </div>
        )}

        {!loading && contract && (
        <>
        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-2xl">
          {/* Contract Data Section */}
          <div className="mb-1">
            <SectionHeader titleAr="بيانات الحجز" titleEn="RESERVATION DATA" />
            <div className="bg-white">
              <FieldRow
                fields={[
                  { label: 'رقم الحجز:', value: String(contract.id ?? '—') },
                  { label: 'حالة الحجز:', value: contract.status || '—' },
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
                  { label: 'الاسم:', value: contract.owner_data?.name },
                  { label: 'البريد الالكتروني:', value: contract.owner_data?.email },
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
                  { label: 'الاسم:', value: contract.seeker_data?.name },
                  { label: 'البريد الالكتروني:', value: contract.seeker_data?.email },
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
                  { label: 'الموقع:', value: contract.property_data?.location },
                  { label: 'الغرض من إستخدام العقار:', value: contract.property_data?.purpose },
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
                  { label: 'قيمة الإيجار:', value: contract.financial_data?.rent_price || '—' },
                  { label: 'مدة الإيجار:', value: contract.financial_data?.rent_duration || '—' },
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
        {/* Action Buttons */}
        {(new Date(contract.expire_at) - new Date()) > 0 && (contract.status == 'PENDING_APPROVAL' || contract.status == 'PENDING_PROCESSING') && (
          <div className="flex justify-center gap-4 mt-8">
            {contract.owner_data?.email.trim().substring(1) == localStorage.getItem('email').trim() && (
              <button
              onClick={handleConfirm}
              className="px-12 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors text-lg"
              >
                تأكيد
              </button>
            )}
            <button
              onClick={handleCancel}
              className="px-12 py-3 bg-white text-red-500 font-bold rounded-lg border-2 border-red-500 hover:bg-red-50 transition-colors text-lg"
              >
              إلغاء
            </button>
          </div>
        )}
        </>
        )}

      </main>
    </div>
  )
}
