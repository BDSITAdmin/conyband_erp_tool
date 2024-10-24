import { useState } from "react";
import Header from "./header";

const Content = () => {
  const [activeTab, setActiveTab] = useState("purchasing");


  return (
    <>
    <Header/>
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Welcome to Cony Band Dashboard</h1>

      <div className="flex mb-6 space-x-4">
        <button
          className={`py-2 px-4 border-b-2  ${
            activeTab === "purchasing" ? " border-blue-500 text-black" : ""
          }`}
          onClick={() => setActiveTab("purchasing")}
        >
          Purchasing
        </button>
        <button
          className={`py-2 px-4 border-b-2 ${
            activeTab === "final" ? " text-black border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("final")}
        >
          Final Goods
        </button>
      </div>

      {activeTab === "purchasing" && (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Item</th>
              <th className="p-2 border border-gray-300">Quantity</th>
              <th className="p-2 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">Item A</td>
              <td className="p-2 border border-gray-300">10</td>
              <td className="p-2 border border-gray-300">$100</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Item B</td>
              <td className="p-2 border border-gray-300">5</td>
              <td className="p-2 border border-gray-300">$50</td>
            </tr>
          </tbody>
        </table>
      )}

      {activeTab === "final" && (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Product</th>
              <th className="p-2 border border-gray-300">Stock</th>
              <th className="p-2 border border-gray-300">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">Product X</td>
              <td className="p-2 border border-gray-300">20</td>
              <td className="p-2 border border-gray-300">$200</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-300">Product Y</td>
              <td className="p-2 border border-gray-300">15</td>
              <td className="p-2 border border-gray-300">$150</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default Content;
