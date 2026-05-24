import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { apis } from '../../api'

function Section({ title, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-primary px-5 py-4 text-white">
        <h2 className="text-xl font-extrabold">{title}</h2>
        <span className="text-sm font-semibold opacity-90">DETAILS</span>
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
      <div className="text-right font-bold text-gray-800">{label}</div>
      <div className="text-left text-gray-600">{value}</div>
    </div>
  )
}

export default function LawyerContractDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.lawyer
      .getContract(Number(id))
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

  if (!loading && !contract) {
    return <Navigate to="/lawyer" replace />
  }

  const handleAccept = async () => {
    try {
      const res = await apis.lawyer.workingOnContract(Number(id));
      if (res.status === 204 || res.status === 200) {
        await Swal.fire({
          title: 'نجاح!',
          text: 'تم قبول الحجز وإضافته إلى حجوزاتي',
          icon: 'success',
          confirmButtonColor: '#1e3a8a'
        });
        navigate('/lawyer/my-contracts')
      } else {
        toast.error('حدث خطأ أثناء قبول الحجز. الرجاء المحاولة لاحقًا.')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'حدث خطأ أثناء قبول الحجز. الرجاء المحاولة لاحقًا.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="border-r-4 border-primary bg-white">
        <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
          تفاصيل الحجز المبدئي
        </h1>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          جاري تحميل التفاصيل...
        </div>
      ) : (
        <>
          <Section title="بيانات الحجز">
            <Row label="رقم الحجز" value={String(contract.id ?? '—')} />
            <Row
              label="التاريخ"
              value={
                contract.created_at
                  ? new Date(contract.created_at).toLocaleDateString('ar')
                  : '—'
              }
            />
            <Row label="الحالة" value={contract.status || '—'} />
          </Section>

          <Section title="أطراف الحجز">
            <Row label="المالك" value={contract.owner_data?.name || '—'} />
            <Row label="المشتري" value={contract.seeker_data?.name || '—'} />
          </Section>

          <Section title="بيانات العقار">
            <Row label="الموقع" value={contract.property_data?.location || '—'} />
            <Row label="الغرض" value={contract.property_data?.purpose || '—'} />
            <Row label="المساحة" value={contract.property_data?.size || '—'} />
          </Section>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-lg bg-primary px-10 py-3 text-lg font-bold text-white transition hover:bg-primary/90"
              disabled={contract.status !== 'PENDING_PROCESSING'}
            >
              قبول الحجز
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border-2 border-primary bg-white px-8 py-3 text-lg font-bold text-primary transition hover:bg-primary/5"
            >
              رجوع
            </button>
          </div>
        </>
      )}
    </div>
  )
}

