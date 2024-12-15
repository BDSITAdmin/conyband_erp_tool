import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import CloseIcon from "@mui/icons-material/Close";
import "react-datepicker/dist/react-datepicker.css";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { format } from "date-fns";
import { z } from "zod";
import useFetch from "../hooks/useFetch";

const purchaseSchema = z.object({
    component_name: z.string().min(1, "Component name is required"),
    purchased_date: z.date(),
    purchased_quantity: z.number().positive("Quantity must be a positive number"),
});

const AddComponentForm = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [component_name, setComponentName] = useState("");
    const [component_id, setComponentId] = useState(""); // Stored but not shown to the user
    const [purchased_date, setPurchasedDate] = useState(new Date());
    const [purchased_quantity, setPurchasedQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputCompValue, setInputCompValue] = useState(""); // For displaying component suggestions
    const [showList, setShowList] = useState(false);

    // Fetch components data
    const { data: componentsData, loading: loadingComponents, error: errorComponents } = useFetch("http://localhost:8080/api/v1/components");

    const toggleModal = () => setIsOpen(!isOpen);

    const validateFormData = () => {
        try {
            purchaseSchema.parse({
                component_name: component_name.trim(),
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
    }, [component_name, purchased_date, purchased_quantity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validData = purchaseSchema.parse({
                component_name: component_name.trim(),
                purchased_date: purchased_date,
                purchased_quantity: purchased_quantity,
            });

            const payload = {
                component_id: component_id.toString(), // Use the selected component's ID for the payload
                purchase_date: format(validData.purchased_date, "yyyy-MM-dd"),
                purchased_quantity: validData.purchased_quantity.toString(),
            };

            console.log("Payload being sent:", payload);

            const response = await axios.post("http://localhost:8080/api/v1/purchases", payload);

            if (response.status === 201) {
                setSuccessMessage("Successfully added purchase!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                setComponentName("");
                setComponentId("");
                setPurchasedQuantity(0);
                setPurchasedDate(new Date());
                setInputCompValue(""); // Clear input field
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

    const handleInputChange = (e) => {
        setInputCompValue(e.target.value);
        setShowList(true);
    };

    const handleSelectList = (item) => {
        setInputCompValue(item.component_name); // Show component name in input
        setComponentName(item.component_name); // Set component name for form validation
        setComponentId(item.component_id); // Internally store component ID
        setShowList(false);
    };

    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}

            <button
                onClick={toggleModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                + Add Purchase
            </button>

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
                                    <label htmlFor="componentName" className="w-1/3">
                                        Component Name
                                    </label>
                                    <input
                                        type="text"
                                        value={inputCompValue}
                                        onChange={handleInputChange}
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Component Name / ID"
                                    />
                                    {showList && (
                                        <ul className="absolute top-[160px] left-[135px] rounded-sm bg-white max-h-[40vh] overflow-y-scroll w-[220px]">
                                            {componentsData?.filter((item) =>
                                                item.component_name.toLowerCase().includes(inputCompValue.toLowerCase()) ||
                                                item.component_id.toString().includes(inputCompValue)
                                            ).map((item, index) => (
                                                <li
                                                    className="p-2 px-4 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => handleSelectList(item)}
                                                    key={index}
                                                >
                                                    {item.component_name} [ID-{item.component_id}]
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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
                                        disabled={!isFormValid}
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
        </>
    );
};

export default AddComponentForm;
