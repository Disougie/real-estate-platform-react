import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { apis } from '../../api'

function ContractCard({ contract }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="text-left">
          <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-sm font-bold text-primary">
            {contract.date}
          </span>
        </div>

        <div className="flex-1 text-right">
          <h3 className="text-xl font-extrabold text-primary">
            الحجز رقم: {contract.contractNumber}
          </h3>
          <p className="mt-2 text-gray-700">
            <span className="font-bold">المالك:</span> {contract.owner}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-bold">المشتري:</span> {contract.buyer}
          </p>
          <p className="mt-1 text-gray-600">
            {contract.property.type} • {contract.property.city} • {contract.property.area}
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-start">
        <Link
          to={`/lawyer/contracts/${contract.id}`}
          className="rounded-lg bg-primary px-5 py-2 font-bold text-white transition hover:bg-primary/90"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  )
}

export default function LawyerHomePage() {
  const [loading, setLoading] = useState(true)
  const [raw, setRaw] = useState([])

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.lawyer
      .getPendingContracts()
      .then((res) => {
        if (!alive) return
        setRaw(res.data || [])
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [])

  const availableContracts = useMemo(() => {
    return (raw || []).map((c) => ({
      id: c.id,
      contractNumber: c.id,
      owner: c.owner_data?.name || '—',
      buyer: c.seeker_data?.name || '—',
      date: c.created_at ? new Date(c.created_at).toLocaleDateString('ar') : '—',
      property: {
        type: c.property_data?.purpose || '—',
        city: c.property_data?.location || '—',
        area: c.property_data?.size || '—',
      },
    }))
  }, [raw])

  return (
    <div>
      <div className="mb-6 border-r-4 border-primary bg-white">
        <h1 className="px-6 py-4 text-right text-3xl font-bold text-primary">
          عروض الحجوزات المبدئية
        </h1>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          جاري تحميل العروض...
        </div>
      ) : availableContracts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          لا توجد عروض متاحة حالياً
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {availableContracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      )}
    </div>
  )
}

