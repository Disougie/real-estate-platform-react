import { useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Settings, LayoutDashboard, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import { clearCurrentRole } from './useRole'
import Header from '../components/Header'

function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <Link to="/" className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full border-2 border-gray-200 bg-white/95 p-1">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <rect x="30" y="40" width="40" height="50" fill="#1e3a5f" />
            <rect x="35" y="50" width="10" height="10" fill="#4cc9f0" />
            <rect x="55" y="50" width="10" height="10" fill="#4cc9f0" />
            <rect x="35" y="65" width="10" height="10" fill="#4cc9f0" />
            <rect x="55" y="65" width="10" height="10" fill="#4cc9f0" />
            <polygon points="50,20 20,45 80,45" fill="#2d4a6f" />
            <circle cx="50" cy="12" r="8" fill="#c9a227" stroke="#1e3a5f" strokeWidth="2" />
          </svg>
        </div>
        <span className="hidden sm:block text-lg font-bold text-white">
          لوحة التحكم
        </span>
      </Link>
    </div>
  )
}

function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center justify-end gap-3 rounded-lg px-4 py-3 transition ${
          isActive
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`
      }
    >
      <span className="font-medium">{label}</span>
      <Icon className="h-5 w-5" />
    </NavLink>
  )
}

export default function DashboardLayout({ role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const roleLinks = useMemo(() => {
    if (role === 'admin') {
      return [{ to: '/admin', icon: LayoutDashboard, label: 'الرئيسية' }]
    }

    return [
      { to: '/lawyer', icon: LayoutDashboard, label: 'الرئيسية' },
      { to: '/lawyer/my-contracts', icon: FileText, label: 'عقودى المبدئية' },
    ]
  }, [role])

  const handleLogout = () => {
    clearCurrentRole()
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    toast.success('تم تسجيل الخروج بنجاح')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Navbar */}
      <Header/>
      {/* <header className="sticky top-0 z-30 border-b border-white/10 bg-primary">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <button
            type="button"
            className="rounded-lg p-2 text-white transition hover:bg-white/10"
            onClick={() => setSidebarOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu className="h-7 w-7" />
          </button>

          <BrandLogo />

          <div className="w-11" />
        </div>
      </header> */}

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
            sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        {/* <aside
          className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[90vw] transform bg-white shadow-2xl transition-transform md:sticky md:top-[57px] md:h-[calc(100vh-57px)] md:translate-x-0 md:shadow-none ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-4 md:hidden">
            <span className="text-lg font-bold text-primary">
              {role === 'admin' ? 'لوحة المدير' : 'لوحة المحامي'}
            </span>
            <button
              type="button"
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-full flex-col p-4">
            <div className="space-y-2">
              {roleLinks.map((link) => (
                <SidebarLink key={link.to} {...link} />
              ))}
            </div>

            <div className="my-4 border-t border-gray-200" />

            <div className="space-y-2">
              <SidebarLink
                to="/account-settings"
                icon={Settings}
                label="إعدادات الحساب"
              />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-end gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-600"
              >
                <span className="font-medium">تسجيل خروج</span>
                <LogOut className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-auto pt-4 text-right text-xs text-gray-400">
              نسخة تجريبية — Mock Data
            </div>
          </div>
        </aside> */}

        {/* Content */}
        <main className="w-full flex-1 px-4 py-6 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

