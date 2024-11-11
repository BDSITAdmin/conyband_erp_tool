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
             + Add Category
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="relative bg-white shadow-lg rounded-xl w-96">
                        <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                        Add Category
                        </h2>

                        <form className="px-6 pb-6 mt-4 space-y-4">
                            

                            {/* Product Name */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="Category Name" className="w-1/3">Category Name</label>
                                <input
                                    type="text"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product Name"
                                />
                            </div>


                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                >
                                    Add Category
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