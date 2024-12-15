import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "react-datepicker/dist/react-datepicker.css";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import LoadingCircle from "./LoadingCircle";
import { format } from "date-fns";
import { z } from "zod";
import useFetch from "../hooks/useFetch";

const componentSchema = z.object({
    product_name: z.union([z.string(), z.number()]).optional(),
    manufactured_date: z.date(),
    manufactured_quantity: z.number().positive("Quantity must be a positive number"),
});

const FinishGood = ({ reFetchTableData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product_name, setProductName] = useState("");
    const [manufactured_date, setManufacturedDate] = useState(new Date());
    const [manufactured_quantity, setManufacturedQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputProdValue, setInputProdValue] = useState(""); // For displaying product suggestions
    const [showList, setShowList] = useState(false);

    const { data: productsData, loading: loadingProducts, error: errorProducts } = useFetch("http://localhost:8080/api/v1/products");

    const toggleModal = () => setIsOpen(!isOpen);

    const validateForm = () => {
        try {
            componentSchema.parse({
                product_name: product_name || undefined,
                manufactured_date: manufactured_date,
                manufactured_quantity: manufactured_quantity,
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
    }, [product_name, manufactured_date, manufactured_quantity]);

    const handleAddFinishedGoodAPI = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validatedData = componentSchema.parse({
                product_name: String(product_name) || undefined,
                manufactured_date: manufactured_date,
                manufactured_quantity: manufactured_quantity,
            });

            const payload = {
                product_id: validatedData.product_name,
                manufactured_date: format(validatedData.manufactured_date, "yyyy-MM-dd"),
                manufactured_quantity: validatedData.manufactured_quantity.toString(),
            };

            console.log("Payload being sent:", payload);

            const response = await axios.post("http://localhost:8080/api/v1/finished-products", payload);

            if (response.status === 201) {
                setSuccessMessage("Successfully added finished good!");
                setTimeout(() => setSuccessMessage(null), 3000);
                reFetchTableData();
                setProductName("");
                setManufacturedQuantity(0);
                setManufacturedDate(new Date());
                toggleModal();
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            setErrorMessage(
                error.response?.data?.message || "Failed to add finished good. Please try again."
            );
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputProdValue(e.target.value);
        setShowList(true);
        e.preventDefault();
    };

    const handleSelectList = (item, e) => {
        setInputProdValue(item.product_name); // Display product name in input
        setProductName(item.product_id); // Store product ID
        setShowList(false);
        e.preventDefault();
    };

    return (
        <>
            {successMessage && <SuccessAlert message={successMessage} />}
            {errorMessage && <ErrorAlert message={errorMessage} />}

            <button
                onClick={toggleModal}
                className="px-4 py-2 text-white flex float-end mx-2 my-3 items-center justify-center bg-[#10B981] rounded-full"
            >
                <AddIcon sx={{ color: "white", paddingTop: "3px" }} /> Add Finished Good
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {isLoading ? (
                        <LoadingCircle />
                    ) : (
                        <div className="relative bg-white shadow-lg rounded-xl max-w-max">
                            <h2 className="text-lg font-medium text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add Finished Good
                            </h2>

                            <form className="px-6 my-3" onSubmit={handleAddFinishedGoodAPI}>
                                

                                <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2>Manufacture Date</h2>
                                    <DatePicker
                                        className="w-full px-2 py-1 border rounded"
                                        selected={manufactured_date}
                                        onChange={(date) => setManufacturedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={new Date()}
                                        showYearDropdown
                                        showMonthDropdown
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2>Product</h2>
                                    <input
                                        type="text"
                                        value={inputProdValue}
                                        onChange={handleInputChange}
                                        className="px-2 py-1 border rounded"
                                        placeholder="Enter Product ID/Name"
                                    />
                                    {showList && (
                                        <ul className="absolute top-[145px] rounded-sm bg-white max-h-[40vh] overflow-y-scroll w-[200px]">
                                            {productsData?.filter((item) =>
                                                item.product_name.toLowerCase().includes(inputProdValue.toLowerCase()) ||
                                                item.product_id.toString().includes(inputProdValue)
                                            ).map((item, index) => (
                                                <li
                                                    className="p-2 px-4 cursor-pointer hover:bg-gray-200"
                                                    onClick={(e) => handleSelectList(item, e)}
                                                    key={index}
                                                >
                                                    {item.product_name} [ID-{item.product_id}]
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 mb-3">
                                    <h2>Quantity</h2>
                                    <input
                                        type="number"
                                        value={manufactured_quantity}
                                        onChange={(e) => setManufacturedQuantity(Number(e.target.value))}
                                        className="px-2 w-[200px] py-1 border rounded"
                                        placeholder="Enter Quantity"
                                        required
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
                                sx={{ cursor: "pointer", color: "#4e504f", position: "absolute", top: "1px", right: "2px", fontWeight: "600" }}
                                onClick={toggleModal}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default FinishGood;
