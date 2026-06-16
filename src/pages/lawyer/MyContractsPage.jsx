import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apis } from '../../api'
import Swal from 'sweetalert2'

function StatusPill({ status }) {
  const normalized = String(status || '').toUpperCase()
  const isGood = ['UNDER_PROCESS', 'COMPLETED', 'PENDING_PROCESSING'].includes(normalized)
  const isWarn = ['PENDING_APPROVAL', 'PENDING_PROCESSING'].includes(normalized)
  const isBad = ['BANNED', 'REJECT', 'EXPIRED'].includes(normalized)

  const cls = isBad
    ? 'bg-red-100 text-red-700'
    : isWarn
      ? 'bg-amber-100 text-amber-700'
      : isGood
        ? 'bg-emerald-100 text-emerald-700'
        : 'bg-gray-100 text-gray-700'

  const labelMap = {
    PENDING_APPROVAL: 'قيد القبول',
    PENDING_PROCESSING: 'قيد المعالجة',
    UNDER_PROCESS: 'قيد التنفيذ',
    COMPLETED: 'مكتمل',
    REJECT: 'مرفوض',
    EXPIRED: 'منتهي',
    BANNED: 'محظور',
  }

  const label = labelMap[normalized] || normalized || '—'
  return <span className={`rounded-full px-3 py-1 text-sm font-bold ${cls}`}>{label}</span>
}

export default function MyContractsPage() {
  const [loading, setLoading] = useState(true)
  const [raw, setRaw] = useState([])
  const [blockingId, setBlockingId] = useState(null)
  const [reason, setReason] = useState('')

  const refresh = () => {
    setLoading(true)
    apis.lawyer
      .getMyContracts()
      .then((res) => setRaw(res.data || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  const acceptedContracts = useMemo(() => {
    return (raw || []).map((c) => ({
      id: c.id,
      contractNumber: c.id,
      owner: c.owner_data?.name || '—',
      buyer: c.seeker_data?.name || '—',
      date: c.created_at ? new Date(c.created_at).toLocaleDateString('ar') : '—',
      status: c.status,
      property: {
        type: c.property_data?.purpose || '—',
        city: c.property_data?.location || '—',
        area: c.property_data?.size || '—',
      },
    }))
  }, [raw])

  const handleComplete = async(id) => {
    const confirmDecision = await Swal.fire({
          title: 'هل أنت متأكد من إتمام العملية؟',
          text: 'هذا الإجراء سيقوم باكمال العمل على الخحز المبدئي وتحويله كعقد نهائي!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#1e3a5f',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'نعم، أنا متأكد',
          cancelButtonText: 'إلغاء'
    });

    if(!confirmDecision.isConfirmed){
      return;
    }

    apis.lawyer.completeContract(Number(id))
      .then(() => refresh())
  }

  const handleBan = async(id) => {
    const confirmDecision = await Swal.fire({
          title: 'هل أنت متأكد من حظر هذه العملية؟',
          text: 'هذا الإجراء سيقوم بحظر هذا الخحز المبدئي وبالتالي خذف العقار',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef4444',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'نعم، أنا متأكد',
          cancelButtonText: 'إلغاء'
    });

    if(!confirmDecision.isConfirmed){
      return;
    }

    apis.lawyer.banContract(Number(id))
      .then(() => refresh())
  }

  const handleCancel = async(id) => {
    const confirmDecision = await Swal.fire({
          title: 'هل أنت متأكد من إلغاء هذه العملية؟',
          text: 'هذا الإجراء سيقوم بإلغاء العمل على الخحز المبدئي وامكانية قبوله من محاميين اخرين!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#1e3a5f',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'نعم، أنا متأكد',
          cancelButtonText: 'إلغاء'
    });

    if(!confirmDecision.isConfirmed){
      return;
    }

    apis.lawyer.cancelContract(Number(id))
      .then(() => refresh())
  }

  return (
    <div>
      <div className="mb-6 border-r-4 border-primary bg-white">
        <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
          حجوزاتي المبدئية
        </h1>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          جاري تحميل الحجوزات...
        </div>
      ) : acceptedContracts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          لا توجد حجوزات مقبولة حتى الآن
        </div>
      ) : (
        <div className="space-y-4">
          {acceptedContracts.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <StatusPill status={c.status} />
                  <span className="text-sm text-gray-500">{c.date}</span>
                </div>

                <div className="flex-1 text-right">
                  <h3 className="text-xl font-extrabold text-primary">
                    العقد رقم: {c.contractNumber}
                  </h3>
                  <p className="mt-2 text-gray-700">
                    <span className="font-bold">المالك:</span> {c.owner}
                  </p>
                  <p className="mt-1 text-gray-700">
                    <span className="font-bold">المشتري:</span> {c.buyer}
                  </p>
                  <p className="mt-1 text-gray-600">
                    {c.property.type} • {c.property.city} • {c.property.area}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-start gap-3">
                <button
                  type="button"
                  onClick={() => handleComplete(c.id)}
                  className="rounded-lg bg-green-600 px-6 py-2 font-bold text-white transition hover:bg-green-700"
                >
                  إتمام / تأكيد
                </button>
                <button
                  type="button"
                  onClick={() => handleBan(c.id)}
                  className="rounded-lg bg-red-600 px-6 py-2 font-bold text-white transition hover:bg-red-700"
                >
                  بلاغ / حظر
                </button>
                <button
                  type="button"
                  onClick={() => handleCancel(c.id)}
                  className="rounded-lg border-2 border-primary bg-white px-6 py-2 font-bold text-primary transition hover:bg-primary/5"
                >
                  إلغاء
                </button>
              </div>

              {blockingId === c.id && (
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="mb-2 text-right font-bold text-gray-800">
                    سبب البلاغ
                  </p>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-right outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                    placeholder="اكتب وصف مختصر للمخالفة..."
                  />
                  <div className="mt-3 flex justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBlockingId(null)
                        setReason('')
                      }}
                      className="rounded-lg border border-gray-300 bg-white px-5 py-2 font-bold text-gray-700 hover:bg-gray-100"
                    >
                      إلغاء
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBlock(c.id)}
                      className="rounded-lg bg-primary px-6 py-2 font-bold text-white hover:bg-primary/90"
                    >
                      إرسال
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

