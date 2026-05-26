import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    path: '/',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    )
  },
  { 
    name: 'Focus', 
    path: '/Focus',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    name: 'Log', 
    path: '/log',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  { 
    name: 'Path', 
    path: '/path',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  },
  { 
    name: 'Stats', 
    path: '/stats',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
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
      {/* ================= MOBILE TOP HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-surface text-white px-3 flex items-center justify-between md:hidden shadow-md">
        <div className="text-lg font-bold select-none">DEVMEPATH</div>
        
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
            fixed top-16 left-0 bottom-0 w-[80%] bg-surface border-r border-gray-700 shadow-xl p-3
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
  `flex items-center gap-3 rounded transition-all duration-200 py-2 px-3 ${
    isOpen ? 'justify-start' : 'justify-center p-2'
  } ${
    isActive 
      ? 'bg-gray-700 text-streak font-medium'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
          className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside 
        className={`
          sticky top-0 z-40 h-screen bg-surface text-white p-3 hidden md:flex flex-col justify-between md:justify-start
          transition-all duration-300 ease-in-out
          w-full
        `}
        aria-label="Main Desktop Navigation"
      >
        <div className={`flex items-center mb-6 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <div className={`text-lg font-bold select-none transition-all duration-200 ${isOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
            DEVMEPATH
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-1 rounded hover:bg-gray-700 transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
  `flex items-center gap-3 rounded transition-all duration-200 py-2 px-3 ${
    isOpen ? 'justify-start' : 'justify-center p-2'
  } ${
    isActive 
      ? 'bg-gray-700 text-streak font-medium'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
  }`
}
                >
                  {item.icon}
                  <span className={`transition-opacity duration-200 whitespace-nowrap ${isOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;