import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Normalize casing for the focus page check
  const isFocusPage = location.pathname.toLowerCase() === '/focus';
  const sidebarWidth = isOpen ? '20%' : '64px';

  return (
    <div 
      className="min-h-screen bg-night flex flex-col md:flex-row"
      style={{ '--sidebar-width': isFocusPage ? '0px' : sidebarWidth }}
    >
      <div className={`
        shrink-0 transition-[width,opacity] duration-300 ease-in-out z-40 bg-surface
        ${isFocusPage ? 'md:fixed md:inset-y-0 md:left-0 md:w-[64px] md:opacity-0 md:hover:opacity-100' : 'hidden md:block w-full md:w-[var(--sidebar-width)]'}
      `}>
        <Sidebar isOpen={isFocusPage ? false : isOpen} setIsOpen={setIsOpen} />
      </div>

     <main
        className="flex-1 px-8 py-4 pt-16 md:pt-6 min-w-0 transition-all duration-300 ease-in-out"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;