import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isFocusPage = location.pathname === '/focus';

  return (
    <div className="min-h-screen bg-night flex flex-col md:flex-row">
      <div 
        className={`
          ${isFocusPage ? 'md:fixed md:inset-y-0 md:left-0 md:z-50 md:opacity-0 md:hover:opacity-100 md:transition-opacity md:duration-300' : ''}
        `}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      
      <main 
        className={`
          flex-1 p-4 pt-16 md:pt-6 min-w-0
          transition-all duration-300 ease-in-out
          ${isFocusPage ? 'md:pl-0' : (isOpen ? 'md:pl-60' : 'md:pl-20')}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;