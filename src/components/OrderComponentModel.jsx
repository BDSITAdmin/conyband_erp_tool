import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const OrderComponentModel = ({ data , setShowComponent, viewAllId }) => {
  const product = data.find((item) => item?.product_id === viewAllId);

  console.log(product)
  const handleClose = () => {
    setShowComponent(false);
  };

  return (
    <div className="p-4">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
          <CloseIcon
            sx={{
              cursor: 'pointer',
              color: '#4e504f',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={handleClose}
          />
          <h2 className="mb-4 text-lg font-semibold">
            {product?.product_name || 'Product'} Components
          </h2>
          {product?.components?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Component Name</th>
                  <th className="border px-4 py-2">Required Quantity</th>
                  <th className="border px-4 py-2">Available Quantity</th>
                  <th className="border px-4 py-2">Shortage</th>
                </tr>
              </thead>
              <tbody>
                {product?.components.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="border px-4 py-2">{item?.component_name}</td>
                    <td className="border px-4 py-2">{item?.required_quantity}</td>
                    <td className="border px-4 py-2">{item?.available_quantity}</td>
                    <td className="border px-4 py-2">
                      {Math.max(0, item?.required_quantity - item?.available_quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No components found for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderComponentModel;
