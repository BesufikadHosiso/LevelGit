import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from './navItems';

const MobileHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ================= MOBILE & TABLET TOP HEADER ================= */}
      {/* Visible on screens smaller than 'lg' (mobile and tablet) */}
      <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-surface text-white px-3 flex items-center justify-between lg:hidden shadow-md">
        <img src="/LevelGitLogo.png" alt="LevelGit Logo" className="h-8 w-auto object-contain select-none" />
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none p-1.5 rounded hover:bg-gray-700 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav 
          className={`
            fixed top-14 left-0 bottom-0 w-[80%] bg-surface border-r border-gray-700 shadow-xl p-3
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded transition-all duration-200 py-2 px-3 justify-start ${
                      isActive ? 'bg-gray-700 text-streak font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 z-40 bg-black/50 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default MobileHeader;