
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const users = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchases, setPurchases] = useState([]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        axios.get(`https://671b7aeb2c842d92c38024bd.mockapi.io/crad`)
            .then(response => setPurchases(response.data))
            .catch(error => console.error("Error fetching purchases:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPurchase = {
            productID,
            productName,
            quantity,
        };

        try {
            const response = await axios.post(`https://671b7aeb2c842d92c38024bd.mockapi.io/crad`, newPurchase);
            setPurchases(prev => [...prev, response.data]);
            toggleModal();
        } catch (error) {
            console.error("Error adding purchase:", error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white shadow-lg rounded-xl w-96">
                        <h2 className="text-lg font-bold text-center text-white bg-[#10B981] py-3 rounded-t-xl">
                            Add Purchase
                        </h2>

                        <form onSubmit={handleSubmit} className="px-6 pb-6 mt-4 space-y-4">
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productID" className="w-1/3">Product ID</label>
                                <select
                                    id="productID"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    value={productID}
                                    onChange={(e) => setProductID(e.target.value)}
                                >
                                    <option value="">Select ID</option>
                                    <option value="001">001</option>
                                    <option value="002">002</option>
                                    <option value="003">003</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="productName" className="w-1/3">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Product Name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="quantity" className="w-1/3">Purchase Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="w-2/3 px-2 py-1 border rounded"
                                    placeholder="Enter Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="bg-[#10B981] text-white px-4 py-2 rounded">
                                    Add Item
                                </button>
                            </div>
                        </form>
                        <button onClick={toggleModal} className="absolute text-lg text-black top-1 right-3 hover:text-gray-600">
                            &times;
                        </button>
                    </div>
                </div>
            )}
            <div className="m-6">
                <h3 className="text-xl font-bold">Purchases</h3>
                <table className="w-full mt-4 border">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Product ID</th>
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{purchase.productID}</td>
                                <td className="px-4 py-2 border">{purchase.productName}</td>
                                <td className="px-4 py-2 border">{purchase.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={toggleModal} className="px-4 py-2 m-6 text-white bg-green-500 rounded">
                + Add Purchase
            </button>
        </>
    );
};

export default users;
