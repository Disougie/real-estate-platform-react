import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apis } from '../api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await apis.login.login({
      loginRequest: { email: formData.email, password: formData.password },
    })

    const authHeader =
      res.headers?.authorization ||
      res.headers?.Authorization ||
      res.headers?.AUTHORIZATION

    if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
      localStorage.setItem('token', authHeader.slice(7).trim())
    }

    const roleRaw = res.data?.role || ''
    const role = String(roleRaw).toLowerCase()
    if (role === 'admin' || role === 'lawyer') {
      localStorage.setItem('role', role)
    }

    if (role === 'admin') {
      navigate('/admin')
      return
    }
    if (role === 'lawyer') {
      navigate('/lawyer')
      return
    }

    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <img src="../assets/LogoPic.png" alt="logo" className="w-48 h-48 mb-12" />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Email Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            البريد الاكتروني
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            كلمة السر
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="********"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gray-200 text-primary font-bold px-12 py-3 hover:bg-gray-300 transition-colors"
          >
            تسجيل دخول
          </button>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 pt-4">
          <Link 
            to="/forgot-password" 
            className="text-white hover:text-accent transition-colors"
          >
            نسيت كلمة المرور؟
          </Link>
          <Link 
            to="/register" 
            className="text-white hover:text-accent transition-colors"
          >
            تسجيل حساب جديد
          </Link>
        </div>
      </form>
    </div>
  )
}
