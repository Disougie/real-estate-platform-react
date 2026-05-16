import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { apis } from '../api'

export default function ContractsPage() {
  const [loading, setLoading] = useState(true)
  const [raw, setRaw] = useState([])

  useEffect(() => {
    let alive = true
    setLoading(true)
    apis.contracts
      .getMyInitialContracts()
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

  const contracts = useMemo(() => {
    return (raw || []).map((c) => ({
      id: c.id,
      contractNumber: c.id,
      owner: c.owner_data?.name || '—',
      buyer: c.seeker_data?.name || '—',
      date: c.created_at ? new Date(c.created_at).toLocaleDateString('ar') : '—',
    }))
  }, [raw])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeNav="الحجوزات المبدئية" />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow">
            جاري تحميل الحجوزات...
          </div>
        ) : (
          <div className="space-y-6">
            {contracts.map((contract) => (
              <Link
                key={contract.id}
                to={`/contracts/${contract.id}`}
                className="block"
              >
                <div className="bg-primary rounded-2xl p-6 text-white hover:bg-primary/90 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    {/* Right side - Contract info */}
                    <div className="space-y-3 text-right flex-1">
                      <h3 className="text-xl font-bold">
                        الحجز رقم: {contract.contractNumber}
                      </h3>
                      <p className="text-lg">المالك : {contract.owner}</p>
                      <p className="text-lg">المشتري : {contract.buyer}</p>
                    </div>

                    {/* Left side - Date */}
                    <div className="text-left mr-8">
                      <p className="text-lg font-medium mb-2">التاريخ</p>
                      <p className="text-xl">{contract.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!loading && contracts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">لا توجد حجوزات حالياً</p>
          </div>
        )}
      </main>
    </div>
  )
}
