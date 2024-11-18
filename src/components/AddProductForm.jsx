import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import LoadingCircle from './LoadingCircle';

const AddProductForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [components, setComponents] = useState([{ name: '', quantity: '' }]);
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);


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

    const handleAddComponent = () => {
        setComponents([...components, { name: '', quantity: '' }]);
    };

    const handleRemoveComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        const newComponents = [...components];
        newComponents[index][field] = value;
        setComponents(newComponents);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            {/* Add Product Button to open the modal */}
            <button
                onClick={toggleModal}
                ref={buttonRef}
                className="px-4 py-2  text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full "
            >
                <AddIcon sx={{ color: 'white', paddingTop: '3px' }} />  Add Product
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    {/* Modal Content */}
                    <div ref={modalRef} className="relative bg-white shadow-lg w-96 rounded-xl ">
                        <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                            Add New Category
                        </h2>
                        <div className="px-6 pb-6 mt-4 space-y-4">
                            <div className="my-4">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input type="text" className="block w-full p-2 mt-1 border border-gray-300 rounded-md" />
                            </div>

                            {components.map((component, index) => (
                                <div key={index} className="my-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Component {index + 1}
                                        </label>
                                        {index > 0 && (
                                            <button
                                                onClick={() => handleRemoveComponent(index)}
                                                className="font-semibold text-red-500"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Component Name"
                                        value={component.name}
                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={component.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                        className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end ">

                                <button
                                    onClick={handleAddComponent}
                                    className="mt-2 text-sm font-semibold text-[#10B981]"
                                >
                                    Add Component
                                </button>
                            </div>

                            <div className="flex justify-center mt-4">
                                <CloseIcon sx={{ cursor: "pointer", color: "#4e504f", position: 'absolute', top: '1px', right: '2px', fontWeight: '600' }} onClick={toggleModal} />
                                <button
                                    className="px-4 py-2 font-semibold text-white bg-[#10B981] rounded-md"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductForm;