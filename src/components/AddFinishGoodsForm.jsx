import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import CloseIcon from "@mui/icons-material/Close";
import "react-datepicker/dist/react-datepicker.css";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import LoadingCircle from "./LoadingCircle";
import { format } from "date-fns";
import useFetch from "../hooks/useFetch";
import { z } from "zod";

const componentSchema = z.object({
    productName: z.string().min(3, "Product name must be at least 3 characters long").optional(),
    product_id: z.string().regex(/^[A-Za-z0-9\s]+$/, "Component ID must only contain alphanumeric characters and spaces"),
    manufactured_quantity: z.number().positive("Quantity must be a positive number"),
    manufactured_date: z.date(),
});

const FinishGood = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product_id, setproduct_id] = useState("");
    const [productName, setproductName] = useState("");
    const [manufactured_date, setmanufacturedDate] = useState(new Date());
    const [manufactured_quantity, setmanufactured_quantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const validateComponentData = () => {
        try {
            componentSchema.parse({
                product_id: product_id.trim() || undefined,
                productName: productName.trim(),
                manufactured_quantity: manufactured_quantity,
                manufactured_date: manufactured_date,
            });
            setIsFormValid(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setIsFormValid(false);
            }
        }
    };

    useEffect(() => {
        validateComponentData();
    }, [product_id, productName, manufactured_quantity, manufactured_date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validateData = componentSchema.parse({
                product_id: product_id.trim() || undefined,
                productName: productName.trim(),
                manufactured_quantity: manufactured_quantity,
                manufactured_date: manufactured_date,
            });

            const payload = {
                product_id: validateData.product_id,
                productName: validateData.productName,
                manufactured_quantity: validateData.manufactured_quantity,
                manufactured_date: format(new Date(validateData.manufactured_date), "yyyy-MM-dd"),
            };

            const response = await axios.post("http://localhost:8080/api/v1/finished-products", payload);
            console.log("response is", response);
            if (response.status === 201) {
                setSuccessMessage("Successfully added finished good!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                setproduct_id("");
                setproductName("");
                setmanufactured_quantity(0);
                setmanufacturedDate(new Date());
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorMessage(error.errors[0].message);
            } else {
                setErrorMessage("Failed to add finished good. Please try again.");
            }
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
                        <LoadingCircle />
                    ) : (
                        <div className="relative bg-white shadow-lg rounded-xl w-96">
                            <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add Finished Good
                            </h2>
                            <form className="px-6 pb-6 mt-4 space-y-4" onSubmit={handleSubmit}>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="manufactureDate" className="w-1/3">
                                        Manufacture Date
                                    </label>
                                    <DatePicker
                                        className="w-full px-2 py-1 border rounded"
                                        selected={manufactured_date}
                                        onChange={(date) => setmanufacturedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={new Date()}
                                        showYearDropdown
                                        showMonthDropdown
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="productID" className="w-1/3">
                                        Product ID
                                    </label>
                                    <input
                                        type="text"
                                        id="productID"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Product ID"
                                        value={product_id}
                                        onChange={(e) => setproduct_id(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="productName" className="w-1/3">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Product Name"
                                        value={productName}
                                        onChange={(e) => setproductName(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="quantity" className="w-1/3">
                                        Manufactured Quantity
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Quantity"
                                        value={manufactured_quantity}
                                        onChange={(e) => setmanufactured_quantity(Number(e.target.value))}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className={`${
                                            isFormValid ? "bg-[#10B981]" : "bg-[#10b98190]"
                                        } text-white px-4 py-[6px] rounded-md flex justify-center items-center`}
                                        disabled={!isFormValid}
                                    >
                                        Add Finished Good
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
                    + Add Finished Good
                </button>
            </div>
        </>
    );
};

export default FinishGood;
