import { useNavigate } from 'react-router-dom'
import { SquarePen, Trash2 } from 'lucide-react'
import Header from '../components/Header'
import { apis } from '../api'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function AccountSettingsPage() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  const userInfo = {
    name: localStorage.getItem('name') || "",
    email: localStorage.getItem('email') || "",
    phone: localStorage.getItem('phone') || "",
    password: '*******',
  }

  const settingsItems = (role == 'user' || role.substring(1) == 'user') ? [
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
      action: () => navigate('/edit-password')
    }
  ] : [
    {
      label: 'البريد الالكتروني',
      value: userInfo.email,
      action: () => navigate('/edit-email')
    },
    {
      label: 'كلمة السر',
      value: userInfo.password,
      action: () => navigate('/edit-password')
    }
  ];

  const handleAccountDeletion = async () => {
    // Step 1: Warning Confirmation Modal
    const confirmResult = await Swal.fire({
      title: 'هل أنت متأكد من حذف الحساب؟',
      text: 'هذا الإجراء سيقوم بتعطيل حسابك نهائياً ولا يمكن التراجع عنه!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'نعم، أنا متأكد',
      cancelButtonText: 'إلغاء'
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    // Step 2: Password Verification Modal
    const { value: password } = await Swal.fire({
      title: 'تأكيد الهوية',
      input: 'password',
      inputPlaceholder: 'أدخل كلمة المرور لتأكيد الهوية',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'تأكيد الحذف',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        if (!value) {
          return 'يرجى إدخال كلمة المرور!';
        }
      }
    });

    if (!password) {
      return;
    }

    // Step 3: API Trigger & Global Cleanup
    try {
      Swal.fire({
        title: 'جاري حذف الحساب...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await apis.users.disableAccount({ password });

      localStorage.clear();
      sessionStorage.clear();

      await Swal.fire({
        icon: 'success',
        title: 'تم تعطيل الحساب بنجاح',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'كلمة المرور غير صحيحة، يرجى المحاولة مجدداً';
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: errorMessage,
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'حسناً'
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
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
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4" dir='ltr'>
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
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
          {/* Delete Icon */}
          <button
            onClick={handleAccountDeletion}
            className="text-red-800 hover:text-red-500 transition-colors p-2"
          >
            <Trash2 className="w-8 h-8" />
          </button>

          {/* Label and Value */}
          <div className="text-right">
            <p className="text-gray-600 text-lg mb-1">حذف الحساب</p>
            {/* <p className="text-gray-900 font-medium text-lg">{item.value}</p> */}
          </div>

        </div>
      </div>
    </div>
  )
}
