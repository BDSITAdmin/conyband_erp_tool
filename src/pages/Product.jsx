import { useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddProductModal from "../components/addProductModal";
import ProductList from "../components/productButton";
import ComponentList from "../components/componentList";
import ProductTable from "../components/productView";



// Sample data
const initialPurchasingData = Array(10).fill({
    id: "#P000001",
    name: "Watch",
    category: "Raw Materials",
});

const initialFinishedGoodsData = Array(10).fill({
    id: "#F000001",
    name: "Finished Component",
    categoryName: "Raw Materials",
});

const initialProductListData = Array(10).fill({
    id: "#PR00001",
    productName: "Product A",
    allComponents: null,
});
const data = [
    { componentName: "Watch Glass", quantity: 100  },
    { componentName: "Watch Glass", quantity: 100  },
   
];

const Table = () => {
    const [activeTab, setActiveTab] = useState("Purchasing");
    const [purchasingData] = useState(initialPurchasingData);
    const [finishedGoodsData] = useState(initialFinishedGoodsData);
    const [productListData] = useState(initialProductListData);
    const [showActions, setShowActions] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Handle tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const toggleActions = (index) => {
        setShowActions(showActions === index ? null : index);
    };

    const handleDelete = (index) => {
        alert(`Deleted item at index ${index}`);
        setShowActions(null);
    };

    const handleEdit = (index) => {
        alert(`Edit item at index ${index}`);
        setShowActions(null);
    };

    // Get data and pagination based on active tab
    const currentData = 
        activeTab === "Purchasing" ? purchasingData : 
        activeTab === "Finished Goods" ? finishedGoodsData : 
        productListData;

    const paginatedData = currentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(currentData.length / itemsPerPage);

    return (
        <div className="p-6 bg-gray-100 rounded-md">
            <h1 className="mb-4 text-2xl font-semibold">Component Management</h1>

            {/* Tabs */}
            <div className="flex mb-6 space-x-4">
                <button
                    className={`px-4 py-2 rounded-md ${activeTab === "Purchasing" ? "bg-[#10B981] text-white" : "bg-gray-200"}`}
                    onClick={() => handleTabChange("Purchasing")}
                >
                    Component List
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeTab === "Finished Goods" ? "bg-[#10B981] text-white" : "bg-gray-200"}`}
                    onClick={() => handleTabChange("Finished Goods")}
                >
                    Component Category
                </button>
                <button
                    className={`px-4 py-2 rounded-md ${activeTab === "Product List" ? "bg-[#10B981] text-white" : "bg-gray-200"}`}
                    onClick={() => handleTabChange("Product List")}
                >
                    Product List
                </button>
            </div>

            <div className="p-4 bg-white rounded-lg">
                <h1 className="mb-4 text-2xl font-semibold">
                    {activeTab === "Purchasing" ? "Component List" : 
                     activeTab === "Finished Goods" ? "Component Category" : 
                     "Product List"}
                </h1>
                
                {/* Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th></th>
                            <th className="p-4">ID</th>
                            {activeTab === "Purchasing" && <th className="p-4">Component Name</th>}
                            {activeTab === "Purchasing" && <th className="p-4">Component Category</th>}
                            {activeTab === "Finished Goods" && <th className="p-4">Category Name</th>}
                            {activeTab === "Product List" && <th className="p-4">Product Name</th>}
                            {activeTab === "Product List" && <th className="p-4">All Components</th>}
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index} className="text-gray-700 border-b hover:bg-gray-100">
                                <td className="p-4"><input type="checkbox" /></td>
                                <td className="p-4">{item.id}</td>
                                {activeTab === "Purchasing" && <td className="p-4">{item.name}</td>}
                                {activeTab === "Purchasing" && <td className="p-4">{item.category}</td>}
                                {activeTab === "Finished Goods" && <td className="p-4">{item.categoryName}</td>}
                                {activeTab === "Product List" && <td className="p-4">{item.productName}</td>}
                                {activeTab === "Product List" && <td className="p-4">
                                    <ProductTable data= {data}/></td>}
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

            {/* Add Buttons */}
            <div className="flex justify-end">
                {activeTab === "Purchasing" && (
                    <ComponentList/>
                )}
                {activeTab === "Finished Goods" && (
                    <ProductList/>
                )}
                {activeTab === "Product List" && (
                   <AddProductModal/>
                )}
            </div>
        </div>
    );
};

export default Table;
