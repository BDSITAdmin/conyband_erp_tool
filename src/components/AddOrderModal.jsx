import React, { useState } from 'react';

const AddOrderModal = () => {
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
                className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
            >
               + Add Order
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    {/* Modal Content */}
                    <div className=" relative bg-white p-6 rounded-lg shadow-md w-96">
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
                                className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
                            >
                                Estimate
                            </button>
                        </div>
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute text-lg text-black top-1 right-3 hover:text-gray-600"
                        >
                            &times;
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default AddOrderModal;