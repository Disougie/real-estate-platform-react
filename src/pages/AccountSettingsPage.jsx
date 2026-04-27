import { useNavigate } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import Header from '../components/Header'

export default function AccountSettingsPage() {
  const navigate = useNavigate()

  const userInfo = {
    name: 'احمد محمد احمد محمد',
    email: 'disougie@gmail.com',
    phone: '+249 11 222 4444',
    password: 'a******'
  }

  const settingsItems = [
    {
      label: 'البريد الالكتروني',
      value: userInfo.email,
      action: () => navigate('/edit-email')
    },
    {
      label: 'رقم الهاتف',
      value: userInfo.phone,
      action: () => navigate('/edit-phone')
    },
    {
      label: 'كلمة السر',
      value: userInfo.password,
      action: () => navigate('/reset-password')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100" dir='ltr'>
      <Header />
      
      {/* User Name Banner */}
      <div className="bg-primary py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-2xl font-bold text-right">
            {userInfo.name}
          </h1>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {settingsItems.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between"
          >
            {/* Edit Icon */}
            <button 
              onClick={item.action}
              className="text-primary hover:text-accent transition-colors p-2"
            >
              <SquarePen className="w-8 h-8" />
            </button>

            {/* Label and Value */}
            <div className="text-right">
              <p className="text-gray-600 text-lg mb-1">{item.label}</p>
              <p className="text-gray-900 font-medium text-lg">{item.value}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}
