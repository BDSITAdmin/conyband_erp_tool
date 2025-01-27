import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiPackage,
  FiClipboard,
} from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { GrDocumentConfig } from "react-icons/gr";

const Menu = () => {
  const location = useLocation();

  return (
    <div className="overflow-y-auto pt-8 w-1/5 space-y-4 px-4 h-[100vh] bg-white border-r">
      <ul>
        {[
          { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
          { label: "Order Management ", icon: <MdBorderColor />, path: "/order-management" },
          { label: "Inventory", icon: <FiBox />, path: "/inventory" },
          { label: "Component Purchase", icon: <FiShoppingCart />, path: "/purchase" },
          { label: "Product Configuration", icon: <GrDocumentConfig />, path: "/product-config" },
          { label: "Vendors", icon: <FiUsers />, path: "/vendors" },
          { label: "Users", icon: <FaUser />, path: "/users" },
          { label: "Settings", icon: <FiSettings />, path: "/settings" },
        ].map(({ label, icon, path }, index) => (
          <li key={index}>
            <Link
              to={path}
              className={`flex items-center gap-2 p-3 rounded hover:bg-gray-200 ${
                location.pathname === path ? 'text-green-500' : 'text-gray-500 hover:text-black'
              }`}
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
