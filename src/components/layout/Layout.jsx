import { useState } from 'react';
import Sidebar from './SideBar';

const Layout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-night flex flex-col md:flex-row">
      
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <main 
        className={`
          flex-1 p-6 pt-20 md:pt-6 min-w-0
          transition-all duration-300 ease-in-out
          ${isOpen ? 'md:pl-72' : 'md:pl-24'}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;