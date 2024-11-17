import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { z } from 'zod';
import LoadingCircle from './LoadingCircle';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import useFetch from '../hooks/useFetch';

const componentSchema = z.object({
    componentCategory: z
        .string()
        .optional(),
    componentName: z
        .string()
        .min(3, "Component name must be at least 3 characters long"),
});

const AddComponentForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [componentCategory, setComponentCategory] = useState("");
    const [componentName, setComponentName] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const{ data, loading, error, reFetch } = useFetch("http://localhost:8080/api/v1/categories")

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const modalRef = useRef(null); 
    const buttonRef = useRef(null);

    const validateForm = () => {
        try {
            componentSchema.parse({
                componentCategory: componentCategory.trim() || undefined,
                componentName: componentName.trim(),
            });
            setIsFormValid(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setIsFormValid(false);
            }
        }
    };

    useEffect(() => {
        validateForm();
    }, [componentCategory, componentName]);


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


    const handleAddComponentAPI = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const validatedData = componentSchema.parse({
                componentCategory: componentCategory.trim() || undefined,
                componentName: componentName.trim(),
            });

            const payload = {
                category_id: validatedData?.componentCategory,
                component_name: validatedData?.componentName,
            };

            // console.log(payload)

            const response = await axios.post("http://localhost:8080/api/v1/components", payload);
            console.log("response is",response)
            if (response.status === 201) {
                setSuccessMessage("Component added successfully!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                setComponentCategory("");
                setComponentName("");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorMessage(error.errors[0].message);
                setTimeout(() => setErrorMessage(null), 3000);
                setIsLoading(false); 
            } else {
                setErrorMessage("Failed to add component. Please try again.");
                setTimeout(() => setErrorMessage(null), 3000);
                setIsLoading(false); 
            } 
        }
    };

    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}
            {/* Button to open the modal */}
            
            <button
                onClick={toggleModal}
                ref={buttonRef}
                className="px-4 py-2  text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full "
            >
             <AddIcon sx={{color:'white', paddingTop:'3px' }}/>  Add Component
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    {isLoading ? <LoadingCircle/> :<div ref={modalRef} className="relative bg-white shadow-lg rounded-xl max-w-max ">
                        <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                        Add New Component Type
                        </h2>

                        <form className="px-6 my-3">
                            <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2 className="">Component Category</h2>
                                    {/* <select
                                        id="ComponentCategory"
                                        className=" px-2 w-[200px] py-1 border rounded"
                                        placeholder="Enter Category ID/Name"
                                        value={componentCategory}
                                        onChange={(e) => setComponentCategory(e.target.value)}
                                    >
                                        <option >Select Category</option>
                                        <option value="bands">bands</option>
                                        <option value="dialog">dialog</option>
                                    </select> */}
                                    <input
                                        type="text"
                                        id="ComponentName"
                                        value={componentCategory}
                                        onChange={(e) => setComponentCategory(e.target.value)}
                                        className="px-2 py-1 border rounded"
                                        placeholder="Enter Category ID/Name"
                                    />
                            </div>

                            {/* Product Name */}
                            <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2 className="">Component Name*</h2>
                                    <input
                                        type="text"
                                        id="ComponentName"
                                        value={componentName}
                                        onChange={(e) => setComponentName(e.target.value)}
                                        className="px-2 w-[200px] py-1 border rounded"
                                        placeholder="Enter Component Name"
                                    />
                            </div>


                            {/* Submit Button */}
                            <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                        disabled={!isFormValid}
                                        onClick={handleAddComponentAPI}
                                    >
                                        Add Component
                                    </button>
                            </div>
                        </form>

                        {/* Close Button */}
                        <CloseIcon sx={{cursor:"pointer", color:"#4e504f", position:'absolute', top:'1px', right:'2px', fontWeight:'600' }} onClick={toggleModal} />
                    </div>}
                </div>
            )}
        </>
    );
};

export default AddComponentForm;