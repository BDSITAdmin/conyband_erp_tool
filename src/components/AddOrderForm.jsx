
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { z } from "zod";

const orderSchema = z.object({
    product_name: z.string().min(1, "Product name is required"),
    order_quantity: z.number().positive("Quantity must be greater than 0"),
});

const AddOrderForm = ({ reFetchTableData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { data: productList, loading, error } = useFetch("http://localhost:8080/api/v1/products");

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const validateForm = () => {
        try {
            orderSchema.parse({
                product_name: productName.trim(),
                order_quantity: parseFloat(quantity), // Convert quantity to number for validation
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
    }, [productName, quantity]);

    const handleProductInputChange = (e) => {
        setProductName(e.target.value);
        setShowSuggestions(true);
    };

    const handleSelectProduct = (product) => {
        setProductName(product.product_name); // Set product name in the input field
        setShowSuggestions(false);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validatedData = orderSchema.parse({
                product_name: productName.trim(),
                order_quantity: parseFloat(quantity),
            });

            const product = productList.find((p) => p.product_name === validatedData.product_name);
            if (!product) {
                throw new Error("Selected product not found.");
            }

            const payload = {
                product_id: product.product_id.toString(),
                order_quantity: validatedData.order_quantity.toString(),
            };

            const response = await axios.post("http://localhost:8080/api/v1/order-config", payload);

            if (response.status === 201) {
                setSuccessMessage("Order added successfully!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                toggleModal();
                setProductName("");
                setQuantity("");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            setErrorMessage(error.message || "Failed to create order. Please try again.");
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={toggleModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                <AddIcon sx={{ color: "white", paddingTop: "3px" }} /> Add Order
            </button>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white shadow-lg rounded-xl max-w-max">
                        <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                            Add Order
                        </h2>

                        <form className="px-6 my-3" onSubmit={handleSubmitOrder}>
                            <div className="relative flex items-center justify-end mb-3">
                                <label className="w-1/3 text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={handleProductInputChange}
                                    className="w-2/3 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter product name"
                                />
                                {showSuggestions && productName && (
                                    <ul className="absolute top-[45px] rounded-sm bg-white max-h-[40vh] overflow-y-scroll w-[200px]">
                                        {productList
                                            ?.filter((product) =>
                                                product.product_name
                                                    .toLowerCase()
                                                    .includes(productName.toLowerCase())
                                            )
                                            .map((product) => (
                                                <li
                                                    key={product.product_id}
                                                    onClick={() => handleSelectProduct(product)}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                >
                                                    {product.product_name} [ID-{product.product_id}]
                                                </li>
                                            ))}
                                    </ul>
                                )}
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
                                    type="submit"
                                    disabled={!isFormValid || isLoading}
                                    className={`px-6 mx-4 py-2 text-white rounded ${
                                        isFormValid && !isLoading ? "bg-[#10B981]" : "bg-[#10b98190]"
                                    }`}
                                >
                                    {isLoading ? "Submitting..." : "Add Order"}
                                </button>
                            </div>
                            <CloseIcon
                                sx={{
                                    cursor: "pointer",
                                    color: "#4e504f",
                                    position: "absolute",
                                    top: "1px",
                                    right: "2px",
                                    fontWeight: "600",
                                }}
                                onClick={toggleModal}
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddOrderForm;
