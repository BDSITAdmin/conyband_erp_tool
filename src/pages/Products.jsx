import { useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import ProductList from "../components/productButton";

// Sample data for Purchasing and Finished Goods
const initialPurchasingData = Array(10).fill({
    id: "#P000001",
    name: "Raw Material",
    category: "Raw Materials",
});

const initialFinishedGoodsData = Array(10).fill({
    id: "#F000001",
    name: "Finished Product",
});

const Table = () => {
    const [activeTab, setActiveTab] = useState("Purchasing");
    const [purchasingData, setPurchasingData] = useState(initialPurchasingData);
    const [finishedGoodsData, setFinishedGoodsData] = useState(initialFinishedGoodsData);
    const [showActions, setShowActions] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const currentData = activeTab === "Purchasing" ? purchasingData : finishedGoodsData;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const toggleActions = (index) => {
        setShowActions(showActions === index ? null : index);
    };

    const handleDelete = (index) => {
        if (activeTab === "Purchasing") {
            setPurchasingData((prevData) => prevData.filter((_, i) => i !== index));
        } else {
            setFinishedGoodsData((prevData) => prevData.filter((_, i) => i !== index));
        }
        setShowActions(null);
    };

    const handleEdit = (index) => {
        const item = currentData[index];
        alert(`Edit item ${item.id} (${item.name})`);
        setShowActions(null);
    };

    const paginatedData = currentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(currentData.length / itemsPerPage);

    return (
        <>
            <div className="p-6 rounded-md bg-gray-50">
                <h1 className="mb-4 text-2xl font-semibold">Product Management</h1>

                {/* Tabs */}
                <div className="flex mb-6 space-x-4">
                    <button
                        className={`px-4 py-2 rounded-md ${activeTab === "Purchasing" ? "bg-green-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => handleTabChange("Purchasing")}
                    >
                        Product List
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${activeTab === "Finished Goods" ? "bg-green-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => handleTabChange("Finished Goods")}
                    >
                        Product Category
                    </button>
                </div>

                <div className="p-4 bg-white rounded-lg">
                    <h1 className="mb-4 text-2xl font-semibold">
                        {activeTab === "Purchasing" ? "Product List" : "Product Category"}
                    </h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-gray-500 border-b">
                                <th className="p-4"></th>
                                <th className="p-4">Product Id</th>
                                <th className="p-4">Product Name</th>
                                {activeTab === "Purchasing" && (
                                    <th className="p-4">Product Category</th>
                                )}
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
                                    {activeTab === "Purchasing" && (
                                        <td className="p-4">{item.category}</td>
                                    )}
                                    <td className="relative p-4">
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

                {/* Pagination */}
                <div className="flex items-center justify-end mt-4 space-x-2">
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
                            className={`px-4 py-2 border rounded ${page === currentPage ? "bg-green-100 text-green-700" : ""}`}
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

            {/* Add Item Button */}
            <div className="flex justify-end">
                {activeTab === "Purchasing" && <ProductList />}
            </div>
             {/* Add Item Button */}
             <div className="flex justify-end">
                {activeTab === "Finished Goods" && <ProductList />}
            </div>
        </>
    );
};

export default Table;
