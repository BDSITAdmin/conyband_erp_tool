import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { z } from 'zod';
import LoadingCircle from './LoadingCircle';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import useFetch from '../hooks/useFetch';

const componentSchema = z.object({
    componentCategory: z.union([z.string(), z.number()]).optional(),
    componentName: z.string().min(3, "Component name must be at least 3 characters long"),
});

const AddComponentForm = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [componentCategory, setComponentCategory] = useState(""); // Stores category ID
    const [componentName, setComponentName] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputCatValue, setInputCatValue] = useState(''); // Stores input display name
    const [showList, setShowList] = useState(false);

    const { data: categoriesData, loading, error } = useFetch("http://localhost:8080/api/v1/categories");

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const validateForm = () => {
        try {
            componentSchema.parse({
                componentCategory: componentCategory || undefined,
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

    const handleAddComponentAPI = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const validatedData = componentSchema.parse({
                componentCategory: String(componentCategory) || undefined, // Ensure ID is a string
                componentName: componentName.trim(),
            });
    
            const payload = [
                {
                    category_id: validatedData?.componentCategory, // Send category ID as string
                    component_name: validatedData?.componentName,
                }
            ];
            console.log(payload);
    
            const response = await axios.post("http://localhost:8080/api/v1/components", payload);
            if (response.status === 201) {
                setSuccessMessage(`${componentName} component added successfully!`);
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                setComponentCategory("");
                setInputCatValue(""); // Clear input value
                setComponentName("");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            if (error instanceof z.ZodError) {
                setErrorMessage(error.errors[0].message);
                setTimeout(() => setErrorMessage(null), 3000);
            } else {
                setErrorMessage("Failed to add component. Please try again.");
                setTimeout(() => setErrorMessage(null), 3000);
            }
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputCatValue(e.target.value);
        setShowList(true);
        e.preventDefault();
    };

    const handleSelectList = (items, e) => {
        setInputCatValue(items?.category_name); // Display category name in input
        setComponentCategory(String(items?.category_id)); // Store category ID as a string
        setShowList(false);
        e.preventDefault();
    };

    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}

            <button
                onClick={toggleModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                <AddIcon sx={{ color: 'white', paddingTop: '3px' }} /> Add Component
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {isLoading ? (
                        <LoadingCircle />
                    ) : (
                        <div className="relative bg-white shadow-lg rounded-xl max-w-max">
                            <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add New Component Type
                            </h2>

                            <form className="px-6 my-3">
                                <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2 className="">Component Category</h2>
                                    <input
                                        type="text"
                                        value={inputCatValue}
                                        onChange={handleInputChange}
                                        className="px-2 py-1 border rounded"
                                        placeholder="Enter Category ID/Name"
                                    />
                                    {showList && (
                                        <ul className='absolute top-[100px] rounded-sm bg-white max-h-[40vh] overflow-y-scroll w-[200px]'>
                                            {categoriesData.filter((item) =>
                                                item.category_name.toLowerCase().includes(inputCatValue.toLowerCase()) ||
                                                item.category_id.toString().includes(inputCatValue)
                                            ).map((items, index) => (
                                                <li
                                                    className='p-2 px-4 cursor-pointer hover:bg-gray-200'
                                                    onClick={(e) => handleSelectList(items, e)}
                                                    key={index}
                                                >
                                                    {items?.category_name} [ID-{items?.category_id}]
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2 className="">Component Name*</h2>
                                    <input
                                        type="text"
                                        value={componentName}
                                        onChange={(e) => setComponentName(e.target.value)}
                                        className="px-2 w-[200px] py-1 border rounded"
                                        placeholder="Enter Component Name"
                                        required
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className={isFormValid ? `bg-[#10B981] text-white px-4 py-[6px] rounded-md` : `bg-[#10b98190] text-white px-4 py-[6px] rounded-md`}
                                        disabled={!isFormValid}
                                        onClick={handleAddComponentAPI}
                                    >
                                        Add Component
                                    </button>
                                </div>
                            </form>

                            <CloseIcon
                                sx={{ cursor: "pointer", color: "#4e504f", position: 'absolute', top: '1px', right: '2px', fontWeight: '600' }}
                                onClick={toggleModal}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AddComponentForm;
