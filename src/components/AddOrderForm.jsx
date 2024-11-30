import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ErrorAlert from './ErrorAlert';
import axios from 'axios'; 
import SuccessAlert from './SuccessAlert';
 
const AddOrderForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For handling loading state
    

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setProductName('');
        setQuantity('');
        setIsModalOpen(false);
    };

    const handleSubmitOrder = async (e) => {
        setIsLoading(true); // Set loading state to true before making API call
        const orderData = {
            product_id: productName,
            quantity: Number(quantity),
        };

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8080/api/v1/productComponents',orderData);
              
              if (response.status === 201) {
                 sttosuccessMaggage("Category ADDED SUCCESESfully !");
                 setTimeout(() => settosucessMessage(null), 3000);
                 reFetchTableData();
                 setIsLoading(false)
                 if (process.env.NODE_ENV === "development") {
                     console.log("Category added:", response.data);
                 }
                setCategoryName("")
             }

           
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEstimate = (e) => {
        e.preventDefault(); 
        handleSubmitOrder();
    };

    return (
        <div>
            {/* Button to open the modal */}
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                <AddIcon sx={{ color: 'white', paddingTop: '3px' }} /> Add Order
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white shadow-lg rounded-xl max-w-max">
                        <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                            Add Order
                        </h2>

                        {/* Form Fields */}
                        <form className="px-6 my-3">
                            <div className="flex items-center justify-end gap-3 mb-3">
                                <label className="w-1/3 text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="w-2/3 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div className="flex items-center mb-6">
                                <label className="w-1/3 text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-2/3 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter quantity"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleEstimate}
                                    disabled={isLoading}
                                    className={`px-4 mx-4 py-2 text-white rounded ${
                                        isLoading ? 'bg-gray-400' : 'bg-[#10B981]'
                                    }`}
                                >
                                    {isLoading ? 'Submitting...' : 'Estimate Order'}
                                </button>
                            </div>
                            <CloseIcon
                                sx={{
                                    cursor: 'pointer',
                                    color: '#4e504f',
                                    position: 'absolute',
                                    top: '1px',
                                    right: '2px',
                                    fontWeight: '600',
                                }}
                                onClick={handleCloseModal}
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddOrderForm;
