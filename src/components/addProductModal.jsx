import React, { useState } from 'react';

const AddProductModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [components, setComponents] = useState([{ name: '', quantity: '' }]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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

    return (
        <div className="">
            {/* Add Product Button to open the modal */}
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 m-6 font-semibold text-white bg-[#10B981] rounded-md"
            >
               + Add Product
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    {/* Modal Content */}
                    <div className="relative p-6 mx-auto bg-white rounded-lg shadow-md w-96">
                        <h2 className="text-2xl font-semibold text-center text-[#10B981]">Add Product</h2>

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
                            <button
                                onClick={handleCloseModal}
                                className="absolute text-lg text-black top-1 right-3 hover:text-gray-600"
                            >
                                &times;
                            </button>
                            <button className="px-4 py-2 font-semibold text-white bg-[#10B981] rounded-md">
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductModal;