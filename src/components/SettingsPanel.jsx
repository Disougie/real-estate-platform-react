import { X, Bookmark, Building2, Home, Gift, Settings, Power } from 'lucide-react'
import { Link, replace, useNavigate } from 'react-router-dom'

const menuItems = [
  {
    icon: Bookmark,
    label: 'العقارات المحفوظة',
    path: '/saved-properties'
  },
  {
    icon: Building2,
    label: 'العقارات خاصتي',
    path: '/my-properties'
  },
  {
    icon: Home,
    label: 'إضافة عقار',
    path: '/add-property'
  },
  {
    icon: Settings,
    label: 'إعدادات الحساب',
    path: '/account-settings'
  },
  {
    icon: Power,
    label: 'تسجيل خروج',
    path: '/'
  }
]

export default function SettingsPanel({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    onClose()
    if(path == "/"){
      localStorage.removeItem("token");
    }
    navigate(path)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with user info */}
        <div className="bg-primary text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold mb-1">{localStorage.getItem('name') || ''}</h2>
            <p className="text-accent text-sm">{localStorage.getItem('email') || ''}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-end gap-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="text-gray-700 font-medium text-lg group-hover:text-primary transition-colors">
                {item.label}
              </span>
              <div className="w-10 h-10 flex items-center justify-center text-primary">
                <item.icon className="w-6 h-6" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
