import React, { useState } from "react";

const TableModal = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);



  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="p-4">
      {/* Button to Open Modal */}
      <button
        onClick={toggleModal}
        className="px-3 py-1 text-[#007AFF] underline hover:text-[#10B981]"
      >
        View All
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-5xl p-4 bg-white rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
              onClick={toggleModal}
            >
              &times;
            </button>

            <h2 className="mb-4 text-lg font-semibold">Component Table</h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-gray-600 bg-gray-100">
                    <th className="px-4 py-2 font-medium text-left">Component Name</th>
                    <th className="px-4 py-2 font-medium text-left">Total Required Quantity</th>
                    <th className="px-4 py-2 font-medium text-left">Available Quantity</th>
                    <th className="px-4 py-2 font-medium text-left">Shortage Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-2">{item.componentName}</td>
                      <td className="px-4 py-2">{item.totalRequired}</td>
                      <td className="px-4 py-2">{item.available}</td>
                      <td className="px-4 py-2">{item.shortage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableModal;