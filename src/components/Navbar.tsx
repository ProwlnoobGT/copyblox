
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black/40 backdrop-blur-md border border-white/5 rounded-full px-6 py-3 mb-12 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/tools">Tools</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{to: string, children: React.ReactNode}> = ({to, children}) => {
  return (
    <Link 
      to={to}
      className="text-gray-300 hover:text-blox-teal transition-colors"
    >
      {children}
    </Link>
  );
};

export default Navbar;
