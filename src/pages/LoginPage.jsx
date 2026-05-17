import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apis } from '../api'
import Logo from '../../assets/LogoPic.png'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await apis.login.login({
        email: formData.email, password: formData.password,
      })

      const authHeader =
        res.headers?.authorization ||
        res.headers?.Authorization ||
        res.headers?.AUTHORIZATION

      if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
        localStorage.setItem('token', authHeader.slice(7).trim())
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('email', formData.email.trim());
        localStorage.setItem('id', res.data.id);
      }

      const roleRaw = res.data?.role || ''
      const role = String(roleRaw).toLowerCase()
      localStorage.setItem('role', role)

      toast.success('تم تسجيل الدخول بنجاح')

      if (role === 'admin') {
        navigate('/admin')
        return
      }
      if (role === 'lawyer') {
        navigate('/lawyer')
        return
      }

      navigate('/home')
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ في تسجيل الدخول')
    }
  }

  // const handleResendToken = async () => {
  //   try {
  //     const res = await apis.resendToken.resendToken({
  //       email: formData.email,
  //     })
  //     if (res.status == 200) {
  //       toast.success('تم إعادة ارسال رمز التأكيد بنجاح')
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'حدث خطأ في إعادة ارسال رمز التأكيد')
  //   }
  // }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <img src={Logo} alt="logo" className="w-48 h-48 mb-12" />

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Email Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-center">
            البريد الاكتروني
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-accent"
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
        <div className="flex flex-wrap justify-center gap-8 pt-4">
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
          <Link
            className="text-white hover:text-accent transition-colors"
            to="/resend-token"
          >
            إعادة ارسال رمز التأكيد
          </Link>
        </div>
      </form>
    </div>
  )
}
