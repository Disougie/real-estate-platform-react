import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apis } from '../api'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
   const res = await apis.forgotPassword.forgotPassword({
    email: email,
   });
   if(res.status == 200)
    alert(res.data.message);
    navigate('/login');
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-gray-200 text-gray-600 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="ادخل البريد ليصلك فيه رمز إعادة التعيين"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gray-200 text-primary font-bold px-16 py-3 hover:bg-gray-300 transition-colors"
          >
            ارسال
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
