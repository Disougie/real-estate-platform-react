import { useState } from 'react'

const tabs = [
  { id: 'PURCHASE', label: 'شراء عقار' },
  { id: 'RENT', label: 'تأجير عقار' },
  { id: 'COMMERCIAL_PURCHASE', label: 'شراء عقار تجاري' },
  { id: 'COMMERCIAL_RENT', label: 'ايجار عقار تجاري' },
  // { id: 'STUDENT', label: 'السكن الطلابي' },
]

export default function PropertyTabs({ activeTab, handleTypeChange }) {
  return (
    <div className="flex items-center gap-0 border border-gray-300 rounded overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTypeChange(tab.id)}
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
