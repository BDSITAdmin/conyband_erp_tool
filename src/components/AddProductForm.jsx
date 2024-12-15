import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import LoadingCircle from './LoadingCircle';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
import QuantityInput from './QuantityInput';

const AddProductForm = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productName, setProductName] = useState('');
    const [components, setComponents] = useState([{ componentID: '', quantity: '' }]);
    const [isFormValid, setIsFormValid] = useState(false);

    // Add a new empty component to the list
    const handleAddComponent = () => {
        setComponents([...components, { componentID: '', quantity: '' }]);
        // console.log("Added new component. Updated components list:", components);
    };

    // Remove a component from the list
    const handleRemoveComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
        // console.log("Removed component at index:", index);
        // console.log("Updated components list:", components);
    };

    // Handle input change for component name or quantity
    const handleInputChange = (index, field, value) => {
        const updatedComponents = [...components];
        updatedComponents[index][field] = value;
        setComponents(updatedComponents);
        // console.log(`Component ${index + 1} updated:`, updatedComponents[index]);
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setIsOpen(!isOpen);
        // console.log("Modal visibility toggled. Is Open:", !isOpen);
    };

    // Form validation
    const validateForm = () => {
        // console.log("Validating form with productName:", productName, "and components:", components);
        if (!productName.trim()) {
            setIsFormValid(false);
            // console.log("Product name is empty or invalid.");
            return;
        }
        for (const component of components) {
            if (!component.componentID || isNaN(component.quantity) || component.quantity <= 0) {
                setIsFormValid(false);
                // console.log("Component data invalid:", component);
                return;
            }
        }
        setIsFormValid(true);
        // console.log("Form is valid.");
    };

    useEffect(() => {
        // console.log("UseEffect triggered: validating form.");
        validateForm();
    }, [productName, components]);

    // Handle product creation and component association with product
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);
    
        try {
            // Step 1: Create the product
            const productResponse = await axios.post('http://localhost:8080/api/v1/products', {
                product_name: productName.trim(),
            });
    
            if (productResponse.status === 201) {
                const productId = productResponse.data.product_id;  // This is the product ID returned from the API
    
                // Step 2: Create product components payload
                const componentPayload = components.map((component) => ({
                    product_id: productId.toString(),  // Convert product_id to string
                    component_id: component.componentID, // Component ID remains as it is
                    quantity: component.quantity.toString(), // Convert quantity to string
                }));
    
                // Log the componentPayload
                console.log('Component Payload:', componentPayload);
    
                // Send the array of component objects to the API in one request
                const componentResponse = await axios.post('http://localhost:8080/api/v1/productComponents', componentPayload);
    
                // Log the response from the productComponents API
                console.log('Product Components API Response:', componentResponse);
    
                if (componentResponse.status === 201) {
                    setSuccessMessage('Product and components added successfully!');
                    setTimeout(() => setSuccessMessage(null), 3000);
    
                    // Reset form
                    setProductName('');
                    setComponents([{ componentID: '', quantity: '' }]);
                    reFetchTableData(); // Refresh the data in the parent component
                }
            }
        } catch (error) {
            // Log the full error response
            console.error('Error during product or component creation:', error.response || error);
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
                <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50">
                    {isLoading ? (
                        <LoadingCircle />
                    ) : (
                        <div className="relative bg-white shadow-lg w-96 rounded-xl">
                            <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add New Product
                            </h2>
                            <form onSubmit={handleCreateProduct} className="px-6 pb-6 ">
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
                                <div className="overflow-y-auto max-h-60">
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
                                                        <CloseIcon sx={{ cursor: 'pointer', color: '#4e504f', fontSize: '20px' }} />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex mt-2 space-x-4">
                                                <input
                                                    type="text"
                                                    placeholder="Component ID"
                                                    value={component.componentID}
                                                    onChange={(e) => handleInputChange(index, 'componentID', e.target.value)}
                                                    className="block w-2/3 p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Quantity"
                                                    value={component.quantity}
                                                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                    className="block w-1/3 p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

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
                                        className={isFormValid ? 'bg-[#10B981] text-white px-4 py-[6px] rounded-md' : 'bg-[#10b98190] text-white px-4 py-[6px] rounded-md'}
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
