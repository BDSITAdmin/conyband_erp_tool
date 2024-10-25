import { useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";



// Sample data for Purchasing and Finished Goods
const initialPurchasingData = Array(10).fill({
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
    const itemsPerPage = 5;

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

    return (
        <>

            <div className="flex flex-col items-center justify-center h-screen bg-red-100">
                <h1 className="text-5xl font-bold text-red-600">Oops!</h1>
                <p className="mt-4 text-xl text-gray-700">Something went wrong.</p>
                <p className="text-gray-500">Error 404 - Page Not Found</p>

            </div>

        </>
    );
};

export default Table;
