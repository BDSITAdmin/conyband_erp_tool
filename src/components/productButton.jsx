import React, { useState } from 'react';
import axios from "axios";
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import LoadingCircle from './LoadingCircle';

const ProductList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tosucessMessage, settosucessMessage] = useState(null);
    const [toErrorMessage, setErrorMessage] = useState(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleAddCategoryAPI=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        const payload = { category_name: categoryName };
        try{
        const response = await axios.post("http://localhost:8080/api/v1/categories", payload);
        if (response.status === 201) {
            settosucessMessage("Category added successfully!");
            setTimeout(() => settosucessMessage(null), 3000);
            setIsLoading(false)
            if (process.env.NODE_ENV === "development") {
                console.log("Category added:", response.data);
            }
        }
        }catch(error){
            if (process.env.NODE_ENV === "development") {
                console.error("Error adding category:", error.message);
            }
            setErrorMessage("Failed to add category. Please try again.");
            setTimeout(() => setErrorMessage(null), 3000);
            setIsLoading(false);
        }
    }

    return (
        <>
            {/* Button to open the modal */}
            {tosucessMessage && <SuccessAlert message={tosucessMessage} />}
            {toErrorMessage && <ErrorAlert message={toErrorMessage} />}
            <button
                onClick={toggleModal}
                className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
            >
             + Add Category
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    {isLoading ? <LoadingCircle/> :
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
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter Product Name"
                                />
                            </div>


                            {/* Submit Button */}
                            <div className="flex justify-center">
                            <button
                                    type="submit"
                                    className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                    onClick={handleAddCategoryAPI}
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
                    </div>}
                </div>
            )}
        </>
    );
};

export default ProductList;