import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Normalize casing for the focus page check
  const isFocusPage = location.pathname.toLowerCase() === '/focus';

  return (
    <div 
      className={`min-h-screen bg-night flex flex-col lg:flex-row ${
        isFocusPage ? 'is-focus-page' : isOpen ? 'is-sidebar-open' : 'is-sidebar-closed'
      }`}
    >
      {/* Mobile/Tablet Header (visible on screens smaller than 'lg') */}
      <MobileHeader />

      <div className={`
        shrink-0 transition-[width,opacity] duration-300 ease-in-out z-40 bg-surface
        ${isFocusPage ? 'lg:fixed lg:inset-y-0 lg:left-0 lg:w-[64px] lg:opacity-0 lg:hover:opacity-100' : 'hidden lg:block w-full lg:w-[var(--sidebar-width)]'}
      `}>
        <Sidebar isOpen={isFocusPage ? false : isOpen} setIsOpen={setIsOpen} />
      </div>

     <main
        className="flex-1 px-8 py-4 pt-16 lg:pt-6 lg:pl-[var(--sidebar-width)] min-w-0 transition-all duration-300 ease-in-out"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;