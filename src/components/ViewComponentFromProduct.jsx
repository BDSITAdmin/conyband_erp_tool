import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ViewComponentFromProduct = ({ data, setShowComponent, viewAllId }) => {

  const componentData = data.find((item)=>{
     if(item?.product_id === viewAllId){
      return item
     }
  })

 //console.log(componentData?.components.length)

    const handleCloseView =()=>{
        setShowComponent(false)
    }

  return (
    <div className="p-4">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[500px]  max-w-5xl p-4 bg-white rounded-lg shadow-lg">

          <CloseIcon sx={{cursor:"pointer", color:"#4e504f", position:'absolute', top:'1px', right:'2px', fontWeight:'600' }} onClick={handleCloseView} />

            <h2 className="mb-4 text-lg font-semibold">{componentData?.product_name} Components</h2>

            {/* Table */}
           {componentData?.components.length > 0 ? 
              <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="text-gray-600 bg-gray-100">
                    <th className="px-4 py-2 font-medium text-left">Component Name</th>
                    <th className="px-4 py-2 font-medium text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {componentData?.components.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-2">{item?.component_name}</td>
                      <td className="px-4 py-2">{item?.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div> : 
              <h2>No Component Found</h2>
              }
          </div>
        </div>
      
    </div>
  );
};

export default ViewComponentFromProduct;