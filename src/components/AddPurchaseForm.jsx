import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import CloseIcon from "@mui/icons-material/Close";
import "react-datepicker/dist/react-datepicker.css";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { format } from "date-fns";
import { z } from "zod";

const purchaseSchema = z.object({
    component_id: z.string().regex(/^[A-Za-z0-9\s]+$/, "Component ID must only contain alphanumeric characters and spaces"),
    purchased_date: z.date(),
    purchased_quantity: z.number().positive("Quantity must be a positive number"),
});

const AddComponentForm = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [component_id, setComponentId] = useState("");
    const [component_name, setComponentName] = useState("");
    const [purchased_date, setPurchasedDate] = useState(new Date());
    const [purchased_quantity, setPurchasedQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [componentIdError, setComponentIdError] = useState("");

    const validateFormData = () => {
        try {
            purchaseSchema.parse({
                component_id: component_id.trim(),
                purchased_date: purchased_date,
                purchased_quantity: purchased_quantity,
            });
            setIsFormValid(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setIsFormValid(false);
            }
        }
    };

    useEffect(() => {
        validateFormData();
    }, [component_id, purchased_date, purchased_quantity]);

    const fetchComponentDetails = async (component_id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/components/${component_id}`);
            if (response.status === 200 && response.data) {
                setComponentName(response.data.component_name);
                setComponentIdError("");
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            setComponentName("");
            setComponentIdError("Component ID not found. Please check and try again.");
        }
    };

    useEffect(() => {
        if (component_id) {
            fetchComponentDetails(component_id);
        } else {
            setComponentName("");
            setComponentIdError("");
        }
    }, [component_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validData = purchaseSchema.parse({
                component_id: component_id.trim(),
                purchased_date: purchased_date,
                purchased_quantity: purchased_quantity,
            });

            const payload = {
                component_id: validData.component_id,
                purchase_date: format(validData.purchased_date, "yyyy-MM-dd"),
                purchased_quantity: validData.purchased_quantity.toString(),
            };
            console.log("Payload being sent:", payload);

            const response = await axios.post("http://localhost:8080/api/v1/purchases", payload);
            console.log("API Response:", response);
            if (response.status === 201) {
                setSuccessMessage("Successfully added purchase!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                setComponentId("");
                setComponentName("");
                setPurchasedQuantity(0);
                setPurchasedDate(new Date());
                toggleModal();
            }
        } catch (error) {
            console.error("Error occurred:", error.response || error.message || error);
            setErrorMessage(
                error.response?.data?.message || "Failed to add purchase. Please try again."
            );
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="relative bg-white shadow-lg rounded-xl w-96">
                            <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add Purchase
                            </h2>
                            <form className="px-6 pb-6 mt-4 space-y-4" onSubmit={handleSubmit}>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="purchaseDate" className="w-1/3">
                                        Purchase Date
                                    </label>
                                    <DatePicker
                                        className="w-full px-2 py-1 border rounded"
                                        selected={purchased_date}
                                        onChange={(date) => setPurchasedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={new Date()}
                                        showYearDropdown
                                        showMonthDropdown
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="componentID" className="w-1/3">
                                        Component ID
                                    </label>
                                    <input
                                        type="text"
                                        id="componentID"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Component ID"
                                        value={component_id}
                                        onChange={(e) => setComponentId(e.target.value)}
                                    />
                                </div>
                                {componentIdError && (
                                    <div className="text-red-500 text-sm mt-1">{componentIdError}</div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="componentName" className="w-1/3">
                                        Component Name
                                    </label>
                                    <input
                                        type="text"
                                        id="componentName"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Component Name"
                                        value={component_name}
                                        readOnly
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="quantity" className="w-1/3">
                                        Purchase Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Quantity"
                                        value={purchased_quantity}
                                        onChange={(e) => setPurchasedQuantity(Number(e.target.value))}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className={`${
                                            isFormValid ? "bg-[#10B981]" : "bg-[#10b98190]"
                                        } text-white px-4 py-2 rounded`}
                                        disabled={!isFormValid || componentIdError}
                                    >
                                        Add Purchase
                                    </button>
                                </div>
                            </form>
                            <CloseIcon
                                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            />
                        </div>
                    )}
                </div>
            )}
            <div className="flex justify-end">
                <button
                    onClick={toggleModal}
                    className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
                >
                    + Add Purchase
                </button>
            </div>
        </>
    );
};

export default AddComponentForm;
