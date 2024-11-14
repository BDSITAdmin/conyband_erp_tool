import { useState, useEffect, useRef } from "react";
import AddOrderModal from "../components/AddOrderModal";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import TableModal from "../components/managementView";

// Sample data for Purchasing and Finished Goods
const initialPurchasingData = Array(10).fill({
    purchaseDate: "#P000001",
    id: "#P000001",
    name: "Watch",
    qty: 1000,
    allComponents:null,
});
const data = [
    { componentName: "Watch Glass", totalRequired: 100, available: 100, shortage: 100 },
    { componentName: "Watch Glass", totalRequired: 100, available: 100, shortage: 100 },
   
];

const Table = () => {
    const [activeTab, setActiveTab] = useState("Purchasing");
    const [purchasingData, setPurchasingData] = useState(initialPurchasingData);
    const [finishedGoodsData, setFinishedGoodsData] = useState([]);
    const [showActions, setShowActions] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const actionRef = useRef(null);

    const currentData = activeTab === "Purchasing" ? purchasingData : finishedGoodsData;

    // Pagination logic
    const paginatedData = currentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(currentData.length / itemsPerPage);

    // Handle toggle actions for the action menu
    const toggleActions = (index) => {
        setShowActions(showActions === index ? null : index);
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionRef.current && !actionRef.current.contains(event.target)) {
                setShowActions(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle delete action
    const handleDelete = (index) => {
        if (activeTab === "Purchasing") {
            setPurchasingData((prevData) => prevData.filter((_, i) => i !== index));
        } else {
            setFinishedGoodsData((prevData) => prevData.filter((_, i) => i !== index));
        }
        setShowActions(null);
    };

    // Handle edit action
    const handleEdit = (index) => {
        const item = currentData[index];
        alert(`Edit item ${item.id} (${item.name})`);
        setShowActions(null);
    };

    return (
        <>
            <div className="p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">Order Management</h1>

                <div className="p-4 bg-white rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="p-4"> </th>
                                <th className="p-4">Product Id</th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Order Qty</th>
                                <th className="p-4">Component</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="text-gray-700 border-b hover:bg-gray-100">
                                    <td className="p-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-4">{item.id}</td>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">{item.qty}</td>
                                    <td className="p-4">
                                        <TableModal data={data}/>
                                    </td>
                                    <td className="relative p-4" ref={actionRef}>
                                        <button className="p-2" onClick={() => toggleActions(index)}>
                                            <FiMoreVertical />
                                        </button>
                                        {showActions === index && (
                                            <div className="absolute right-0 w-32 mt-2 bg-white border rounded shadow-lg">
                                                <button
                                                    className="flex items-center w-full gap-2 px-4 py-2"
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <FiTrash2 /> Delete
                                                </button>
                                                <button
                                                    className="flex items-center w-full gap-2 px-4 py-2"
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

                <div className="flex items-center justify-end mt-4 space-x-2">
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
            <div className="flex justify-end">
                <AddOrderModal />
            </div>
        </>
    );
};

export default Table;
