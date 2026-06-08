import { useState, useEffect } from 'react'
import { Menu, Map, FileText, Bell, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import SettingsPanel from './SettingsPanel'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { API_BASE_URL } from '../api/http'
// import { http } from '../api/http'

export default function Header({ activeNav }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(false)

  const role = localStorage.getItem('role');
  const navItems = (role != 'user') ? [] : [
    { label: 'بحث الخرائط', path: '/map-search', icon: Map },
    { label: 'الحجوزات المبدئية', path: '/contracts', icon: FileText },
    { label: 'الاشعارات', path: '/notifications', icon: Bell },
    { label: 'المدونة', path: '/blogs', icon: Newspaper },
  ]

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Only connect if the user is authenticated and has the correct role
    if (role !== 'user' || !token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}` // Adjust if your backend expects a different format (e.g., just the token without 'Bearer ')
      },
      onConnect: () => {
        client.subscribe('/user/queue/notifications', (message) => {
          if (message.body) {
            setHasNewNotification(true);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [role]);

  const handleNotificationClick = () => {
    setHasNewNotification(false);
  };

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
                onClick={item.label === 'الاشعارات' ? handleNotificationClick : undefined}
                className={`relative transition-colors text-lg font-medium ${activeNav === item.label
                  ? 'text-accent'
                  : 'text-white hover:text-accent'
                  }`}
              >
                {item.label}
                {item.label === 'الاشعارات' && hasNewNotification && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
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
                    onClick={item.label === 'الاشعارات' ? handleNotificationClick : undefined}
                    className={`relative p-2 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${activeNav === item.label
                      ? 'text-accent'
                      : 'text-white hover:text-accent'
                      }`}
                  >
                    <Icon size={24} />
                    {item.label === 'الاشعارات' && hasNewNotification && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
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
