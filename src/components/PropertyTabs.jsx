import { useState } from 'react'

const tabs = [
  { id: 'buy', label: 'شراء عقار' },
  { id: 'rent', label: 'تأجير عقار' },
  { id: 'commercial', label: 'عقار تجاري' },
  { id: 'student', label: 'السكن الطلابي' },
]

export default function PropertyTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-0 border border-gray-300 rounded overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 first:border-l-0 ${
            activeTab === tab.id
              ? 'bg-accent text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
