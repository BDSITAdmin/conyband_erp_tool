import { useState } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";


// Sample data for Purchasing and Finished Goods
const initialPurchasingData = Array(10).fill({
    id: "#P000001",
    name: "Watch",
    category: "Raw Materials",

});

const initialFinishedGoodsData = Array(10).fill({
    id: "#F000001",
    name: "Finished Product",
    categoryName: "Raw Materials",
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

    // Add catogery Model Handle //
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // add product model  
    const [isOpenproduct, setIsOpenproduct] = useState(false);

    const addproducttoggleModal = () => {
        setIsOpenproduct(!isOpenproduct);
    };



    return (
        <>
            <div className="p-6 rounded-md bg-gray-100">
                <h1 className="mb-4 text-2xl font-semibold">Product Management</h1>

                {/* Tabs */}
                <div className="flex mb-6 space-x-4">
                    <button
                        className={`px-4 py-2 rounded-md ${activeTab === "Purchasing" ? "bg-[#10B981] text-white" : "bg-gray-200"
                            }`}
                        onClick={() => handleTabChange("Purchasing")}
                    >
                        Product List
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${activeTab === "Finished Goods" ? "bg-[#10B981] text-white" : "bg-gray-200"
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
                                {activeTab === "Finished Goods" && (

                                    <th className="p-4">Category Name</th>
                                )}
                                {activeTab === "Purchasing" && (

                                    <th className="p-4">Product Name</th>
                                )}
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
                                    {activeTab === "Finished Goods" && (
                                        <td className="p-4">{item.categoryName}</td>
                                    )}
                                    {activeTab === "Purchasing" && (
                                        <td className="p-4">{item.name}</td>
                                    )}
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
                {/*Add product Modal */}
                {isOpenproduct && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className="relative bg-white shadow-lg rounded-xl w-96">
                            <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add Product type
                            </h2>

                            <form className="px-6 pb-6 mt-4 space-y-4">
                                {/* Manufactured Quantity */}
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="quantity" className="w-1/3">Product Category</label>
                                    <select
                                        id="productCategory"
                                        className="w-2/3 px-2 py-1 border rounded"
                                    >
                                        <option value="watch">watch</option>
                                        <option value="bands">bands</option>
                                        <option value="dialog">dialog</option>
                                    </select>
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
                                <div className="text-right">
                                    {/* <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevents navigation
                                            handleTabChange("Finished Goods");
                                            toggleModal(); // Trigger the main modal toggle
                                            addProductToggleModal(); // Trigger additional modal toggle
                                        }}
                                        className="text-[#10B981] font-bold"
                                    >
                                        Add New Category
                                    </Link> */}
                                    {/* Close Button */}
                            <button
                                 onClick={(e) => {
                                    e.preventDefault(); // Prevents navigation
                                    addProductToggleModal(); 
                                    // handleTabChange("Finished Goods");
                                    // toggleModal(); // Trigger the main modal toggle
                                    // Trigger additional modal toggle
                                }}
                                className="text-lg text-black  hover:text-gray-600"
                            >
                               Add New Category
                            </button>

                                </div>



                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>

                            {/* Close Button */}
                            {/* <button
                                onClick={addproducttoggleModal}
                                className="absolute text-lg text-black top-1 right-3 hover:text-gray-600"
                            >
                                &times;
                            </button> */}
                        </div>
                    </div>
                )}

                {/* Add category Modal */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className="relative bg-white shadow-lg rounded-xl w-96">
                            <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                                Add Category
                            </h2>

                            <form className="px-6 pb-6 mt-4 space-y-4">


                                {/* Product Name */}
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="productName" className="w-1/3">Category Name</label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Category Name"
                                    />
                                </div>



                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-[#10B981]  text-white px-4 py-2 rounded"
                                    >
                                        Add Product
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
                {activeTab === "Purchasing" && (
                    <button
                        onClick={addproducttoggleModal}
                        className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
                    >
                        + Add New Product
                    </button>
                )}
            </div>
            {/* Add Item Button */}
            <div className="flex justify-end">
                {activeTab === "Finished Goods" &&
                    (


                        <button
                            onClick={toggleModal}
                            className="px-4 py-2 m-6 text-white bg-[#10B981] rounded"
                        >
                            + Add Category
                        </button>
                    )

                }
            </div>
        </>
    );
};

export default Table;
