import { useState } from 'react';
import Sidebar from './SideBar';

const Layout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-night flex flex-col md:flex-row">
      
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <main 
        className={`
          flex-1 p-4 pt-16 md:pt-6 min-w-0
          transition-all duration-300 ease-in-out
          ${isOpen ? 'md:pl-60' : 'md:pl-20'}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;