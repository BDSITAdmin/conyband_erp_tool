import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import LoadingCircle from './LoadingCircle';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';



const AddProductForm = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productName, setProductName] = useState('');
    const [components, setComponents] = useState([{ name: '', quantity: '' }]);
    const [isFormValid, setIsFormValid] = useState(false);

    

    const handleAddComponent = () => {
        setComponents([...components, { name: '', quantity: '' }]);
    };

    const handleRemoveComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        const updatedComponents = [...components];
        updatedComponents[index][field] = value;
        setComponents(updatedComponents);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const validateForm = () => {
        if (!productName.trim()) {
            setIsFormValid(false);
            return;
        }
        for (const component of components) {
            if (!component.name.trim() || isNaN(component.quantity) || component.quantity <= 0) {
                setIsFormValid(false);
                return;
            }
        }
        setIsFormValid(true);
    };

    useEffect(() => {
        validateForm();
    }, [productName, components]);
      

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const productResponse = await axios.post('http://localhost:8080/api/v1/products', {
                product_name: productName.trim(),
            });
            console.log("productResponse", productResponse)
            if (productResponse.status === 201) {
                const productId = productResponse.data.id; 

                // Step 2: Attach components to the product
                const componentPromises = components.map((component) =>
                    axios.post('http://localhost:8080/api/v1/components', {
                        product_id: productId,
                        component_name: component.name.trim(),
                        quantity: parseInt(component.quantity, 10),
                    })
                );

                await Promise.all(componentPromises);

                setSuccessMessage('Product and components added successfully!');
                setTimeout(() => setSuccessMessage(null), 3000);

                // Reset form
                setProductName('');
                setComponents([{ name: '', quantity: '' }]);
                reFetchTableData(); // Refresh the data in the parent table if applicable
            }
        } catch (error) {
            setErrorMessage('Failed to add product or components. Please try again.');
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}

            <button
                onClick={toggleModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                <AddIcon sx={{ color: 'white', paddingTop: '3px' }} /> Add Product
            </button>

            {isOpen && (
<<<<<<< HEAD
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {isLoading ? (
                        <LoadingCircle />
                    ) : (
                        <div className="relative bg-white shadow-lg w-96 rounded-xl">
                            <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add New Product
                            </h2>
                            <form onSubmit={handleCreateProduct} className="px-6 pb-6 mt-4 space-y-4">
                                <div className="my-4">
                                    <label className="block text-sm font-medium text-gray-700">Product Name*</label>
                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        placeholder="Enter Product Name"
                                        required
                                    />
                                </div>

                                {components.map((component, index) => (
                                    <div key={index} className="my-4">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Component {index + 1}
                                            </label>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveComponent(index)}
                                                    className="font-semibold text-red-500"
                                                >
                                                    <CloseIcon sx={{cursor:"pointer", color:"#4e504f",fontSize:'20px', fontWeight:'600' }}/>
                                                </button>
                                                
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Component Name"
                                            value={component.name}
                                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                                            required
                                        />
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            value={component.quantity}
                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                            className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                ))}
=======
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
                            <div className="overflow-y-auto max-h-80">
                                {components.map((component, index) => (
                                    <div key={index} className="my-4 ">
                                        <div className="flex items-center justify-between ">
                                            <label className="block text-sm font-medium text-gray-700 overflow-auto max-h-90%">
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
                            </div>
>>>>>>> monu_ERP

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleAddComponent}
                                        className="mt-2 text-sm font-semibold text-[#10B981]"
                                    >
                                        Add Component
                                    </button>
                                </div>

                                <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className={
                                    isFormValid
                                        ? 'bg-[#10B981] text-white px-4 py-[6px] rounded-md flex justify-center items-center'
                                        : 'bg-[#10b98190] text-white px-4 py-[6px] rounded-md flex justify-center items-center'
                                    }
                                    disabled={!isFormValid}
                                >
                                    Add Product
                                </button>
                                </div>
                            </form>

                            <CloseIcon
                                sx={{
                                    cursor: 'pointer',
                                    color: '#4e504f',
                                    position: 'absolute',
                                    top: '1px',
                                    right: '2px',
                                    fontWeight: '600',
                                }}
                                onClick={toggleModal}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddProductForm;