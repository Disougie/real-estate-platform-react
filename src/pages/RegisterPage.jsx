import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apis } from '../api'
import Logo from '../../assets/LogoPic.png'
import Swal from 'sweetalert2'
import PrivacyPolicyCheckbox from './PrivacyPolicyCheckbox'

export default function RegisterPage() {
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!isPolicyAccepted) {
      toast.error('يجب الموافقة على سياسة الخصوصية وشروط الاستخدام')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمة السر غير متطابقة')
      return
    }

    try {
      const res = await apis.registration.register({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      })

      if (res.status == 200 || res.status == 201) {
        Swal.fire({
          title: 'تم إنشاء الحساب بنجاح',
          text: 'الان عليك تأكيد بريدك الالكتروني لتتمكن من تسجيل الدخول',
          icon: 'success',
          confirmButtonText: 'حسنا',
          cancelButtonColor: '#0a0d8c',
        })
        // toast.success('تم إنشاء الحساب بنجاح')
        navigate('/login')
      }
      else if (res.status == 400) {
        setError(res.data.message);
        toast.error(res.data.message);
      }
      else {
        throw Error("something went wrong");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب'
      setError(errorMsg);
      toast.error(errorMsg);
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <img src={Logo} alt="logo" className="w-48 h-48 mb-12" />

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Name Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            الإسم
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="flex items-center gap-4">
          <label className="text-white text-xl font-medium min-w-[140px] text-right">
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

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

        {/* Privacy Policy Checkbox */}
        <PrivacyPolicyCheckbox isChecked={isPolicyAccepted} setIsChecked={setIsPolicyAccepted} />

        <p className='text-red'>{error}</p>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isPolicyAccepted}
            className="bg-gray-200 text-primary font-bold px-12 py-3 hover:bg-gray-300 transition-colors"
          >
            تسجيل
          </button>
        </div>

        {/* Back to Login Link */}
        <div className="flex justify-center pt-2">
          <Link
            to="/login"
            className="text-white hover:text-accent transition-colors"
          >
            لديك حساب؟ تسجيل دخول
          </Link>
        </div>
      </form>
    </div>
  )
}
