import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AddOrderForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleEstimate = () => {
        // Handle estimation logic here
        console.log('Estimating order for:', { productName, quantity });
        handleCloseModal();
    };

    return (
        <div className="">
            {/* Button to open the modal */}
            <button
                onClick={handleOpenModal}
                className="px-4 py-2  text-white flex float-end mr-6 items-center justify-center bg-[#10B981] rounded-full"
            >
               <AddIcon sx={{color:'white', paddingTop:'3px' }}/>  Add Order
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Modal Content */}
                    <div className="relative p-6 bg-white rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-semibold text-[#10B981] mb-4">Add Order</h2>

                        {/* Form Fields */}
                        <div className="flex items-center mb-4">
                            <label className="w-1/3 text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-2/3 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex items-center mb-6">
                            <label className="w-1/3 text-sm font-medium text-gray-700">Qty</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-2/3 p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Estimate Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleEstimate}
                                className="px-4 mx-4 py-2 text-white bg-[#10B981] rounded"
                            >
                                Estimate Order
                            </button>
                        </div>
                        {/* Close Button */}
                        <CloseIcon sx={{cursor:"pointer", color:"#4e504f", position:'absolute', top:'1px', right:'2px', fontWeight:'600' }} onClick={handleCloseModal} />
                    </div>

                </div>
            )}
        </div>
    );
};

export default AddOrderForm;