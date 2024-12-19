import React, { useState, useEffect } from 'react';
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
    const [components, setComponents] = useState([{ componentID: '', componentName: '', quantity: '' }]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showComponentList, setShowComponentList] = useState(false); // To toggle suggestion list for components
    const [componentSuggestions, setComponentSuggestions] = useState([]); // Stores the fetched suggestions for components

    // Fetch available component data for suggestions
    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/components'); // Assuming API endpoint for components
                setComponentSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching components:', error);
            }
        };
        fetchComponents();
    }, []);

    // Add a new empty component to the list
    const handleAddComponent = () => {
        setComponents([...components, { componentID: '', componentName: '', quantity: '' }]);
    };

    // Remove a component from the list
    const handleRemoveComponent = (index) => {
        setComponents(components.filter((_, i) => i !== index));
    };

    // Handle input change for component name or quantity
    const handleInputChange = (index, field, value) => {
        const updatedComponents = [...components];
        updatedComponents[index][field] = value;
        setComponents(updatedComponents);
    };

    // Handle input for component name search
    const handleComponentInputChange = (e, index) => {
        const value = e.target.value;
        handleInputChange(index, 'componentName', value); // Update componentName in state
        handleInputChange(index, 'componentID', ''); // Reset componentID when typing new input
        setShowComponentList(true);
    };

    // Select a component from the suggestion list
    const handleSelectComponent = (component, index) => {
        const updatedComponents = [...components];
        updatedComponents[index].componentID = component.component_id; // Set component ID
        updatedComponents[index].componentName = component.component_name; // Set component name
        setComponents(updatedComponents);
        setShowComponentList(false);
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // Form validation
    const validateForm = () => {
        if (!productName.trim()) {
            setIsFormValid(false);
            return;
        }
        for (const component of components) {
            if (!component.componentID || isNaN(component.quantity) || component.quantity <= 0) {
                setIsFormValid(false);
                return;
            }
        }
        setIsFormValid(true);
    };

    useEffect(() => {
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
                const productId = productResponse.data.product_id;

                // Step 2: Create product components payload
                const componentPayload = components.map((component) => ({
                    product_id: productId.toString(),
                    component_id: component.componentID.toString(), // Use component ID in the payload
                    quantity: component.quantity.toString(),
                }));

                const componentResponse = await axios.post('http://localhost:8080/api/v1/productComponents', componentPayload);

                if (componentResponse.status === 201) {
                    setSuccessMessage('Product and components added successfully!');
                    setTimeout(() => setSuccessMessage(null), 3000);

                    // Reset form
                    setProductName('');
                    setComponents([{ componentID: '', componentName: '', quantity: '' }]);
                    reFetchTableData();
                }
            }
        } catch (error) {
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
                                <div className="overflow-y-auto max-h-80">
                                    {components.map((component, index) => (
                                        <div key={index} className="my-4">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-sm font-medium text-gray-700">Component {index + 1}</label>
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
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={component.componentName}
                                                    onChange={(e) => handleComponentInputChange(e, index)}
                                                    placeholder="Component Name / ID"
                                                    className="w-1/2 p-2 border border-gray-300 rounded-md "
                                                    required
                                                />
                                                {showComponentList && component.componentName && (
                                                    <ul className="absolute top-[820] left-[15px] rounded-sm bg-white max-h-[40vh] overflow-y-scroll w-[200px] border">
                                                        {componentSuggestions
                                                            .filter((item) =>
                                                                item.component_name
                                                                    .toLowerCase()
                                                                    .includes(component.componentName.toLowerCase()) ||
                                                                item.component_id.toString().includes(component.componentName)
                                                            )
                                                            .map((item) => (
                                                                <li
                                                                    key={item.component_id}
                                                                    onClick={() => handleSelectComponent(item, index)}
                                                                    className="p-2 px-4 cursor-pointer hover:bg-gray-200"
                                                                >
                                                                    {item.component_name} [ID-{item.component_id}]
                                                                </li>
                                                            ))}
                                                    </ul>
                                                )}
                                                <input
                                                    type="number"
                                                    value={component.quantity}
                                                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                    placeholder="Quantity"
                                                    className="block w-1/2 p-2 border border-gray-300 rounded-md"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" onClick={handleAddComponent} className="mt-2 text-sm font-semibold text-[#10B981]">
                                        Add Component
                                    </button>
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button
                                        type="submit"
                                        className={`px-4 py-[6px] rounded-md text-white ${
                                            isFormValid ? 'bg-[#10B981]' : 'bg-[#10b98190]'
                                        }`}
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
