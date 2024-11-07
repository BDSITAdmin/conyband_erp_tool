import { useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from "../Hook/useFetch";
import axios from "axios";



// Sample data for Purchasing and Finished Goods
const initialPurchasingData = Array(10).fill({
    purchaseDate: "25/10/2024",
    id: "#P000001",
    name: "Raw Material",
    category: "Raw Materials",
    quantity: 1000,
    status: "Available",
});

const initialFinishedGoodsData = Array(10).fill({
    id: "#F000001",
    name: "Finished Product",
    category: "Finished Goods",
    quantity: 500,
    status: "Unavailable",
});

const StatusBadge = ({ status }) => {
    const statusColor =
        status === "Available"
            ? "text-green-500"
            : status === "Pending"
                ? "text-yellow-500"
                : "text-red-500";

    return (
        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusColor} bg-current`} />
            {status}
        </div>
    );
};

const Table = () => {
    const [activeTab, setActiveTab] = useState("Purchasing"); // Track active tab
    const [purchasingData, setPurchasingData] = useState(initialPurchasingData); // State for Purchasing data
    const [finishedGoodsData, setFinishedGoodsData] = useState(initialFinishedGoodsData); // State for Finished Goods data
    const [showActions, setShowActions] = useState(null); // Control action dropdown visibility
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [ product_id, setproductId] = useState(null); // Track product
    const [purchase_date, setPurchaseDate] = useState(new Date());
    const [purchased_quantity, setPurchasedQuantity] = useState(null);
    const itemsPerPage = 5;


    const { data, loading, error, reFetch } = useFetch('http://localhost:8080/api/v1/purchases')



    const handleSubmit = async (e) => {
        e.preventDefault();
        const purchaseData ={product_id,purchase_date,purchased_quantity}
        console.log(purchaseData);

        const purchased= {
            product_id,
            purchase_date,
            purchased_quantity
        };
            
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/purchases`,purchased);
            setPurchases(prev => [...prev, response.data]);
            setMessage("Data successfully added"); // Set success message
            toggleModal();
        } catch (error) {
            console.error("Error adding purchase:", error);
            setMessage("Error adding data, please try again."); // Set error message
        }
    };


    // Get data based on active tab
    const currentData = activeTab === "Purchasing" ? purchasingData : finishedGoodsData;

    // Handle tab switching
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to page 1 when tab changes
    };

    // Handle toggle actions for the action menu
    const toggleActions = (index) => {
        setShowActions(showActions === index ? null : index);
    };

    // Handle delete action
    const handleDelete = (index) => {
        if (activeTab === "Purchasing") {
            setPurchasingData((prevData) => prevData.filter((_, i) => i !== index));
        } else {
            setFinishedGoodsData((prevData) => prevData.filter((_, i) => i !== index));
        }
        setShowActions(null); // Close action menu after delete
    };

    // Handle edit action
    const handleEdit = (index) => {
        const item = currentData[index];
        alert(`Edit item ${item.id} (${item.name})`);
        setShowActions(null);
    };

    // Handle add item for Finished Goods
    const handleAddItem = () => {
        const newItem = {
            id: `#F${String(finishedGoodsData.length + 1).padStart(6, '0')}`,
            name: "New Finished Product",
            category: "Finished Goods",
            quantity: 100,
            status: "Available",
        };
        setFinishedGoodsData((prevData) => [...prevData, newItem]);
    };

    // Pagination logic
    const paginatedData = currentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(currentData.length / itemsPerPage);

    // model handel //
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] =  useState(new Date());

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">
                    Purchase Materials
                </h1>
               
                <div className="p-4 bg-white rounded-lg">
                   
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="p-4"> </th>
                                <th className="p-4">Purchased Date</th>
                                <th className="p-4">Product Id</th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Product Category</th>
                                <th className="p-4">Purchased Quantity</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="text-gray-700 border-b hover:bg-gray-100"
                                >
                                    <td className="p-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-4">{item.purchaseDate}</td>
                                    <td className="p-4">{item.id}</td>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4">{item.quantity}</td>
                                    <td className="p-4">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="relative p-4">
                                        <button className="p-2" onClick={() => toggleActions(index)}>
                                            <FiMoreVertical />
                                        </button>
                                        {showActions === index && (
                                            <div className="absolute right-0 w-32 mt-2 bg-white border rounded shadow-lg">
                                                <button
                                                    className="flex items-center w-full gap-2 px-4 py-2 "
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <FiTrash2 /> Delete
                                                </button>
                                                <button
                                                    className="flex items-center w-full gap-2 px-4 py-2 "
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    <FiEdit2 /> Edit
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/*Purchase material Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="relative bg-white shadow-lg rounded-xl w-96">
                        <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                        Add Purchase
                        </h2>

                        <form className="px-6 pb-6 mt-4 space-y-4" onClick={handleSubmit}>
                           <div className="flex items-center space-x-2">
                                <label htmlFor="productName" className="w-1/3">Purchase Date</label>
                                <DatePicker
                                    className='w-full px-2 py-1 border rounded'
                                    showIcon
                                    toggleCalendarOnIconClick
                                    selected={purchase_date}
                                    onChange={(date) => setPurchaseDate(date)}
                                />
                            </div>
                            
  
                           {/* Product ID */}
                           <div className="flex items-center space-x-2">
                                <label htmlFor="productID" className="w-1/3">Product ID</label>
                                <input
                                    type="text"
                                    id="productID"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product ID"
                                    value={product_id}
                                    onChange={(e) => setproductId(e.target.value)}
                                />
                            </div>

                            {/* Product Name */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productName" className="w-1/3">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product Name"
                                />
                            </div>

                            {/* Manufactured Quantity */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="quantity" className="w-1/3">Purchase Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Quantity"
                                    value={purchased_quantity}
                                    onChange={(e) => setPurchasedQuantity (e.target.value)}
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

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>

                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute text-lg text-black top-1 right-3 hover:text-gray-600"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

                {/* Pagination and Add Item */}
                <div className="flex items-center justify-end mt-4 space-x-2">
                    {/* Pagination */}
                    <div className="space-x-2">
                        <button
                            className="px-4 py-2 border rounded"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                            <button
                                key={page}
                                className={`px-4 py-2 border rounded ${page === currentPage ? "bg-green-100 text-green-700" : ""
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="px-4 py-2 border rounded"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
            {/* Add Item Button, visible only for Finished Goods tab */}
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

export default Table;
