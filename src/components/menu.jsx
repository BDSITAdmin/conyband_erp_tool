import React from 'react';
import icon1 from '../assets/dashboard.png';
import icon2 from '../assets/inventry.png';
import icon3 from '../assets/shopping-cart.png';
import icon4 from '../assets/vendor.png';
import icon5 from '../assets/product.png';
import icon6 from '../assets/user.png';
import icon7 from '../assets/setting.png';


const Menu = () => {
    return (
        <div className="w-2/12 min-w-4 h-screen bg-[#FFFFF] text-base font-semibold text-[#9CA3AF] p-4">

            <ul className="space-y-4 ">
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon1}
                        alt='dashboard'
                        className=''
                    />
                    <a href="#inventory">Dashboard</a>
                </li>
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon2}
                        alt='inventry'
                        className=''
                    />
                    <a href="#inventory">Inventory</a>
                </li>
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon3}
                        alt='purchase'
                        className=''
                    />
                    <a href="#purchase">Purchase</a>
                </li>
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon4}
                        alt='vendor'
                        className=''
                    />
                    <a href="#vendors">Vendors</a>
                </li>
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon5}
                        alt='product'
                        className=''
                    />
                    <a href="#products">Products</a>
                </li>
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon6}
                        alt='user'
                        className=''
                    />
                    <a href="#users">Users</a>
                </li>
                <li className="flex hover:bg-gray-700 p-2 gap-2 rounded">
                    <img
                        src={icon7}
                        alt='settings'
                        className=''
                    />
                    <a href="#settings">Settings</a>
                </li>
            </ul>
        </div>
    );
};

export default Menu;

