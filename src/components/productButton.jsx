import React, { useState } from 'react';

const ProductList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Button to open the modal */}
            
            <button
                onClick={toggleModal}
                className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
            >
               + Add New Product
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="relative bg-white shadow-lg rounded-xl w-96">
                        <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                           Add Product type
                        </h2>

                        <form className="px-6 pb-6 mt-4 space-y-4">
                            

                            {/* Product Name */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productName" className="w-1/3">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product Name"
                                />
                            </div>

                            {/* Manufactured Quantity */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="quantity" className="w-1/3">Product Category</label>
                                <select
                                    id="productCategory"
                                    className="w-2/3 px-2 py-1 border rounded"
                                >
                                    <option value="watch">watch</option>
                                    <option value="bands">bands</option>
                                    <option value="dialog">dialog</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>

                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute text-lg text-black top-1 right-3 hover:text-gray-600"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;