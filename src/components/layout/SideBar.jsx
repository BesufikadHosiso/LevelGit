import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from './navItems';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside 
        className={`
          sticky top-0 z-40 h-screen bg-surface text-white p-3 hidden lg:flex flex-col justify-between lg:justify-start overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
        `}
        aria-label="Main Desktop Navigation"
      > {/* LevelGit: version control your developer growth */}
        <div className={`flex items-center mb-6 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <img 
            src="/LevelGitLogo.png" 
            alt="LevelGit Logo" 
            width="36"
            height="36"
            fetchpriority="high"
            loading="eager"
            decoding="sync"
            className={`h-9 object-contain select-none transition-all duration-300 ${isOpen ? 'block opacity-100 w-auto' : 'hidden opacity-0 w-0'}`} 
          />
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center shrink-0"
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
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded transition-all duration-200 py-2 px-3 ${isOpen ? 'justify-start' : 'justify-center'} ${
                      isActive ? 'bg-gray-700 text-streak font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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