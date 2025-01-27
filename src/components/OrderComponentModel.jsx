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
            <table className="w-full border border-collapse border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Component Name</th>
                  <th className="px-4 py-2 border">Required Quantity</th>
                  <th className="px-4 py-2 border">Available Quantity</th>
                  <th className="px-4 py-2 border">Shortage</th>
                </tr>
              </thead>
              <tbody>
                {product?.components.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-2 border">{item?.component_name}</td>
                    <td className="px-4 py-2 border">{item?.required_quantity}</td>
                    <td className="px-4 py-2 border">{item?.available_quantity}</td>
                    <td className="px-4 py-2 border">
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