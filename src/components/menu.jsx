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

const Menu = () => {
  const location = useLocation();

  return (
    <div className= " w-64 h-auto p-4  bg-white border-r">
      <ul className="fixed mt-8 space-y-4">

        {[
          { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
          { label: "Inventory", icon: <FiBox />, path: "/inventory" },
          { label: "Purchase", icon: <FiShoppingCart />, path: "/purchase" },
          { label: "Order Management", icon: <FiBox />, path: "/OrderManagement" },
          { label: "Vendors", icon: <FiUsers />, path: "/vendors" },
          { label: "Components", icon: <FiPackage />, path: "/Components" },
          { label: "Users", icon: <FiClipboard />, path: "/users" },
          { label: "Settings", icon: <FiSettings />, path: "/settings" },
        ].map(({ label, icon, path }) => (
          <li key={path} className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
            <Link
              to={path}
              className={`flex items-center gap-2 text-gray-500 ${location.pathname === path ? 'text-green-500 ' : 'hover:text-black'}`}
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
