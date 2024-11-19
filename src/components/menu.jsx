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
    <div className="overflow-y-auto pt-8 w-1/5 space-y-4 px-4 h-[100vh] bg-white border-r">
      <ul>
        {[
          { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
          { label: "Inventory", icon: <FiBox />, path: "/inventory" },
          { label: "Purchase", icon: <FiShoppingCart />, path: "/purchase" },
          { label: "Orders ", icon: <FiBox />, path: "/order-config" },
          { label: "Vendors", icon: <FiUsers />, path: "/vendors" },
          { label: "Product Config", icon: <FiPackage />, path: "/product-config" },
          { label: "Users", icon: <FiClipboard />, path: "/users" },
          { label: "Settings", icon: <FiSettings />, path: "/settings" },
        ].map(({ label, icon, path }) => (
          <li key={path}>
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
