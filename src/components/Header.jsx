import { useState } from 'react'
import { Menu, Map, FileText, Bell, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import SettingsPanel from './SettingsPanel'
// import LogoPic from '../../assets/LogoPic.png'


export default function Header({ activeNav }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const role = localStorage.getItem('role');
  const navItems = (role != 'user') ? [] : [
    { label: 'بحث الخرائط', path: '/map-search', icon: Map },
    { label: 'الحجوزات المبدئية', path: '/contracts', icon: FileText },
    { label: 'الاشعارات', path: '/notifications', icon: Bell },
    { label: 'المدونة', path: '/blogs', icon: Newspaper },
  ]

  return (
    <>
      <header className="bg-primary text-white">
        <div className="flex items-center justify-between px-6 py-3">

          {/* Settings/Hamburger Menu (Always visible) */}
          <button
            className="p-2 text-white hover:text-accent transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`transition-colors text-lg font-medium ${activeNav === item.label
                  ? 'text-accent'
                  : 'text-white hover:text-accent'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section: Mobile Icons & Settings/Hamburger */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Icon Navigation */}
            <nav className="flex md:hidden items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    title={item.label}
                    className={`p-2 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${activeNav === item.label
                      ? 'text-accent'
                      : 'text-white hover:text-accent'
                      }`}
                  >
                    <Icon size={24} />
                  </Link>
                );
              })}
            </nav>

            {/* LogoPic */}
            <div className="flex items-center gap-4">
              <Link to={role == 'user' ? "/home" : role == 'admin' ? "/admin" : "/lawyer"}>
                <img src='/LogoPic.png' alt="LogoPic" className="w-[65px] h-[65px]" />
              </Link>
            </div>
          </div>

        </div>
      </header>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  )
}
