import { createContext, useContext, useMemo, useState } from 'react'

const ContractsContext = createContext(null)

const seedContracts = [
  {
    id: 'ic-1001',
    contractNumber: '1001',
    owner: 'حسن أحمد محمد عبد الرحمن',
    buyer: 'أسامة محمد سيد علي',
    property: { city: 'الخرطوم بحري', area: '150 متر مربع', type: 'شقة' },
    date: '26/04/2026',
    status: 'available', // available | accepted | blocked
  },
  {
    id: 'ic-1002',
    contractNumber: '1002',
    owner: 'محمد علي أحمد',
    buyer: 'خالد عبدالله محمد',
    property: { city: 'امدرمان', area: '220 متر مربع', type: 'منزل' },
    date: '25/04/2026',
    status: 'available',
  },
  {
    id: 'ic-1003',
    contractNumber: '1003',
    owner: 'سارة أحمد عبدالله',
    buyer: 'معتز عمر سعيد',
    property: { city: 'بحري', area: '310 متر مربع', type: 'فيلا' },
    date: '24/04/2026',
    status: 'available',
  },
]

export function ContractsProvider({ children }) {
  const [contracts, setContracts] = useState(seedContracts)

  const availableContracts = useMemo(
    () => contracts.filter((c) => c.status === 'available'),
    [contracts],
  )

  const acceptedContracts = useMemo(
    () => contracts.filter((c) => c.status === 'accepted' || c.status === 'blocked'),
    [contracts],
  )

  const getById = (id) => contracts.find((c) => c.id === id)

  const acceptContract = (id) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'accepted' } : c)),
    )
  }

  const cancelContract = (id) => {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'available' } : c)),
    )
  }

  const blockContract = (id, reason = '') => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'blocked', blockReason: reason || 'مخالفة قانونية' }
          : c,
      ),
    )
  }

  const value = useMemo(
    () => ({
      contracts,
      availableContracts,
      acceptedContracts,
      getById,
      acceptContract,
      cancelContract,
      blockContract,
    }),
    [contracts, availableContracts, acceptedContracts],
  )

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}

export function useContracts() {
  const ctx = useContext(ContractsContext)
  if (!ctx) throw new Error('useContracts must be used within ContractsProvider')
  return ctx
}

