import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { z } from 'zod';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import LoadingCircle from './LoadingCircle';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


const categorySchema = z.object({
    category_name: z
        .string()
        .min(3, "Category name must be at least 3 characters long")
        .max(50, "Category name must be less than 50 characters")
        .regex(/^[A-Za-z0-9 ]+$/, "Category name can only contain letters, numbers, and spaces"),
});

const AddCategoryForm = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tosucessMessage, settosucessMessage] = useState(null);
    const [toErrorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);



    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const validateCategoryName = (name) => {
        try {
            categorySchema.parse({ category_name: name });
            setIsFormValid(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setIsFormValid(false);
            }
        }
    };


    const handleAddCategoryAPI = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const validatedData = categorySchema.parse({ category_name: categoryName });
        const payload = { category_name: validatedData.category_name };
        try {
            const response = await axios.post("http://localhost:8080/api/v1/categories", payload);
            if (response.status === 201) {
                settosucessMessage("Category added successfully!");
                setTimeout(() => settosucessMessage(null), 3000);
                reFetchTableData();
                setIsLoading(false)
                if (process.env.NODE_ENV === "development") {
                    console.log("Category added:", response.data);
                }
                setCategoryName("")
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorMessage(error.errors[0].message);
                setTimeout(() => setErrorMessage(null), 3000);
                setIsLoading(false);
            } else {
                if (process.env.NODE_ENV === "development") {
                    console.error("Error adding category:", error.message);
                }
                setErrorMessage("Failed to add category. Please try again.");
                setTimeout(() => setErrorMessage(null), 3000);
                setIsLoading(false);
            }
            setCategoryName("")
        }
    }

    useEffect(() => {
        validateCategoryName(categoryName);
    }, [categoryName]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            {/* Button to open the modal */}
            {tosucessMessage && <SuccessAlert message={tosucessMessage} />}
            {toErrorMessage && <ErrorAlert message={toErrorMessage} />}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    {isLoading ? <LoadingCircle /> :
                        <div ref={modalRef} className="relative bg-white shadow-lg rounded-xl max-w-max ">
                            <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add New Category Type
                            </h2>

                            <form className="px-6 my-3">

<<<<<<< HEAD
                            {/* Product Name */}
                            <div className="flex items-center justify-center gap-3">
                                <h2 className="w-[140px]">Category Name*</h2>
                                <input
                                    type="text"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter Product Name"
                                    required
                                />
                            </div>
=======
                                {/* Product Name */}
                                <div className="flex items-center justify-center gap-3">
                                    <h2 className="w-[140px]">Category Name*</h2>
                                    <input
                                        type="text"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        id="categoryName"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Enter Product Name"
                                    />
                                </div>
>>>>>>> monu_ERP


                                {/* Submit Button */}
                                <div className="flex justify-center mb-[1rem] mt-[0.75rem] ">
                                    <button
                                        type="submit"
                                        className={isFormValid ? ` bg-[#10B981] text-white px-4 py-[6px] rounded-md flex justify-center items-center ` : ` bg-[#10b98190] text-white px-4 py-[6px] rounded-md flex justify-center items-center `}
                                        onClick={handleAddCategoryAPI}
                                        disabled={!isFormValid}
                                    >
                                        Add Category
                                    </button>
                                </div>
                            </form>

                            {/* Close Button */}
                            <CloseIcon sx={{ cursor: "pointer", color: "#4e504f", position: 'absolute', top: '1px', right: '2px', fontWeight: '600' }} onClick={toggleModal} />
                        </div>}
                </div>
            )}
            <button
                onClick={toggleModal}
                ref={buttonRef}
                className="px-4 py-2  text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full "
            >
                <AddIcon sx={{ color: 'white', paddingTop: '3px' }} /> Add Category
            </button>
        </>
    );
};

export default AddCategoryForm;