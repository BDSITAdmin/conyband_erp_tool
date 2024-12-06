import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import axios from "axios";

const AddOrderForm = ({ reFetchTableData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productList, setProductList] = useState([]); // Store the full product list
    const [productId, setProductId] = useState("");

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => {
        setProductName("");
        setQuantity("");
        setProductId("");
        setIsModalOpen(false);
    };

    // Fetch the full product list once when the component mounts
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/products");
                if (response.status === 200 && Array.isArray(response.data)) {
                    setProductList(response.data);
                } else {
                    throw new Error("Failed to fetch product list");
                }
            } catch (error) {
                console.error("Error fetching product list:", error);
                setErrorMessage("Failed to fetch product list. Please try again.");
                setTimeout(() => setErrorMessage(null), 3000);
            }
        };

        fetchProductList();
    }, []);

    // Find the product ID by filtering the local product list
    const findProductId = (name) => {
        const product = productList.find((p) => p.product_name === name.trim());
        if (product) {
            return product.product_id;
        } else {
            setErrorMessage("Product not found. Please check the product name.");
            setTimeout(() => setErrorMessage(null), 3000);
            return null;
        }
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Find product ID from the local product list
        const id = findProductId(productName);
        if (!id) {
            setIsLoading(false);
            return; // Stop execution if product ID is not found
        }

        const payload = {
            product_id: id.toString(),
            order_quantity: quantity.toString(),
        };

        console.log(payload)

        try {
            const response = await axios.post("http://localhost:8080/api/v1/order-config", payload);
            if (response.status === 201) {
                setSuccessMessage("Order added successfully!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                handleCloseModal(); // Close modal on success
            }
        } catch (error) {
            console.error("Error creating order:", error);
            setErrorMessage("Failed to create order. Please try again.");
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Button to open the modal */}
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                <AddIcon sx={{ color: 'white', paddingTop: '3px' }} /> Add Order
            </button>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white shadow-lg rounded-xl max-w-max">
                        <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                            Add Order
                        </h2>

                        {/* Form Fields */}
                        <form className="px-6 my-3">
                            <div className="flex items-center justify-end gap-3 mb-3">
                                <label className="w-1/3 text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="w-2/3 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div className="flex items-center mb-6">
                                <label className="w-1/3 text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-2/3 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter quantity"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleSubmitOrder}
                                    disabled={isLoading}
                                    className={`px-4 mx-4 py-2 text-white rounded ${
                                        isLoading ? 'bg-gray-400' : 'bg-[#10B981]'
                                    }`}
                                >
                                    {isLoading ? 'Submitting...' : 'Estimate Order'}
                                </button>
                            </div>
                            <CloseIcon
                                sx={{
                                    cursor: 'pointer',
                                    color: '#4e504f',
                                    position: 'absolute',
                                    top: '1px',
                                    right: '2px',
                                    fontWeight: '600',
                                }}
                                onClick={handleCloseModal}
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddOrderForm;
