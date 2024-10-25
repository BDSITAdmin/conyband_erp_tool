import { useState } from "react";
import { FiMenu, FiSearch, FiCalendar, FiMail, FiBell } from "react-icons/fi";
import MyImage from "../assets/profile.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=" fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <FiMenu size={24} className="cursor-pointer" onClick={toggleMenu} />
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FiSearch className="absolute text-gray-600 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-48 py-1 pl-10 pr-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <FiCalendar size={20} className="cursor-pointer text-gray-600" />
        <FiMail size={20} className="cursor-pointer text-gray-600" />
        <FiBell size={20} className="cursor-pointer text-gray-600" />
        <div className="flex items-center space-x-2 cursor-pointer text-gray-600">
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
