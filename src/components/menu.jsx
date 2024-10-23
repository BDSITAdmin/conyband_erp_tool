import {
    FiHome,
    FiBox,
    FiShoppingCart,
    FiUsers,
    FiSettings,
    FiPackage,
    FiClipboard,
  } from "react-icons/fi";
  
  const Menu = ({ activePage, setActivePage }) => {
    return (
      <div className="w-64 h-full p-4 overflow-y-auto bg-white border-r">
        <ul className="space-y-4">
          {[
            { label: "Dashboard", icon: <FiHome />, page: "dashboard" },
            { label: "Inventory", icon: <FiBox />, page: "inventory" },
            { label: "Purchase", icon: <FiShoppingCart />, page: "purchase" },
            { label: "Vendors", icon: <FiUsers />, page: "vendors" },
            { label: "Products", icon: <FiPackage />, page: "products" },
            { label: "Users", icon: <FiClipboard />, page: "users" },
            { label: "Settings", icon: <FiSettings />, page: "settings" },
          ].map(({ label, icon, page }) => (
            <li
              key={page}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                activePage === page ? "bg-gray-300 text-black" : "text-gray-500"
              } hover:bg-gray-200`}
              onClick={() => setActivePage(page)}
            >
              {icon}
              {label}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Menu;
  