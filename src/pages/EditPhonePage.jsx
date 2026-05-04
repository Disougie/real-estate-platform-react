import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apis } from '../api'

export default function EditPhonePage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await apis.changeInfo.changePhone({ phone , password});
    if(res.status == 204){
      navigate('/account-settings');
    }
    else {
      throw new Error("something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <img src="../assets/LogoPic.png" alt="logo" className="w-48 h-48 mb-12" />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* New Phone Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            رقم الهاتف الجديد
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-gray-200 text-gray-600 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="ادخل رقم الهاتف الجديد"
            required
          />
        </div>
        {/* Password Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            كلمة المرور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-gray-200 text-gray-600 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="كلمة السر الحالية"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gray-200 text-primary font-bold px-16 py-3 hover:bg-gray-300 transition-colors"
          >
            تأكيد
          </button>
        </div>

        {/* Back Link */}
        <div className="flex justify-center pt-2">
          <Link 
            to="/account-settings" 
            className="text-white hover:text-accent transition-colors"
          >
            العودة لإعدادات الحساب
          </Link>
        </div>
      </form>
    </div>
  )
}
