
import { useState } from "react";
import { Link } from 'react-router-dom';
import BasicDatePicker from '../components/DatePicker'
import QuantityInput from './QuantityInput'


const AddProductForm = () => {

    // model handel //
    const [isOpen, setIsOpen] = useState(false);


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };




    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="relative bg-white shadow-lg rounded-xl w-96">
                        <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                            Add Purchase
                        </h2>

                        <form className="px-6 pb-6 mt-4 space-y-4" >
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productName" className="w-1/3">Purchase Date</label>
                                <BasicDatePicker
                                    className='w-full px-2 py-1 border rounded'
                                    showIcon
                                    placeholder='Purchase Date'
                                    
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productID" className="w-1/3">Product ID</label>
                                <input
                                    type="text"
                                    id="productID"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product ID"

                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productName" className="w-1/3">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product Name"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="quantity" className="w-1/3">Purchase Quantity</label>
                                <QuantityInput
                                    type="number"
                                    id="quantity"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Quantity"
                                />
                            </div>
                            <div className="text-right">
                                <Link
                                    to=""
                                    className='text-[#10B981] font-bold'
                                >
                                    Add New Product
                                </Link>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={toggleModal}
                            className="absolute text-lg text-black top-1 right-3 hover:text-gray-600"
                        >
                            &times;
                        </button>
                    </div>
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

export default AddProductForm;
