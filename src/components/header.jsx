import { useState } from "react";
import { FiMenu, FiSearch, FiCalendar, FiMail, FiBell } from "react-icons/fi";
import MyImage from "../assets/profile.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <FiMenu size={24} className="cursor-pointer" onClick={toggleMenu} />
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-48 py-1 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <FiCalendar size={20} className="cursor-pointer" />
        <FiMail size={20} className="cursor-pointer" />
        <FiBell size={20} className="cursor-pointer" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src={MyImage}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Balaji Nant</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
