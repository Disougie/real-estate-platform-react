import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import SettingsPanel from './SettingsPanel'

const navItems = [
  { label: 'بحث الخرائط', path: '/map-search' },
  { label: 'الحجوزات المبدئية', path: '/contracts' },
  { label: 'الاشعارات', path: '/notifications' },
  { label: 'المدونة', path: '/blogs' },
]

export default function Header({ activeNav }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <header className="bg-primary text-white">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Hamburger on desktop */}
          <button 
            className="hidden md:block text-white hover:text-accent transition-colors"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Menu size={28} />
          </button>
          

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`transition-colors text-lg font-medium ${
                  activeNav === item.label 
                    ? 'text-accent' 
                    : 'text-white hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/home">
            <img src="../assets/LogoPic.png" alt="logo" className="w-[65px] h-[65px]" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Menu size={28} />
          </button>

          
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
