import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apis } from '../api'
import Logo from '/assets/LogoPic.png'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('كلمة السر غير متطابقة')
      return
    }
    const res = await apis.resetPassword.resetPassword({
      newPassword: formData.newPassword,
      confirmPasswordPassword: formData.confirmPassword,
    });
    if(res.status == 204) {
      alert("Password changed successfully");
      localStorage.removeItem("token");
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <img src={Logo} alt="logo" className="w-48 h-48 mb-12" />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* New Password Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            كلمة السر الجديدة
          </label>
          <input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="********"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            تأكيد كلمة السر
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="********"
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

        {/* Back to Login Link */}
        <div className="flex justify-center pt-2">
          <Link 
            to="/login" 
            className="text-white hover:text-accent transition-colors"
          >
            العودة لتسجيل الدخول
          </Link>
        </div>
      </form>
    </div>
  )
}
