import { useState } from "react";
import { FiMenu, FiSearch, FiCalendar, FiMail, FiBell } from "react-icons/fi";
import MyImage from "../assets/profile.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full p-4 bg-white shadow-md ">
      <div className="flex items-center ">
        <FiMenu size={24} className="cursor-pointer" onClick={toggleMenu} />
        <div className="">
          <h3 className="ml-6 text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
            Cony Band
          </h3>
        </div>

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
        <FiCalendar size={20} className="text-gray-600 cursor-pointer" />
        <FiMail size={20} className="text-gray-600 cursor-pointer" />
        <FiBell size={20} className="text-gray-600 cursor-pointer" />
        <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
          <img
            src={MyImage}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">BigDoor</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
