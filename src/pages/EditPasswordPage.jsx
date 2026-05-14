import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apis } from '../api'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('كلمة السر غير متطابقة')
      return
    }
    const res = await apis.changeInfo.changePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
    if(res.status == 204) {
      alert("Password changed successfully");
      localStorage.removeItem("token");
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <img src="../assets/LogoPic.png" alt="logo" className="w-48 h-48 mb-12" />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Old Password Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            كلمة السر القديمة
          </label>
          <input
            type="password"
            value={formData.oldPassword}
            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="********"
            required
          />
        </div>

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
            تأكيد كلمة السر الجديدة
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
      </form>
    </div>
  )
}
