import { useState } from "react";
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { date } from "zod";


const Table = () => {

    const [product_id, setproductId] = useState(null); // Track product
    const [purchase_date, setPurchaseDate] = useState(new Date());
    const [purchased_quantity, setPurchasedQuantity] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const purchaseData = { product_id, purchase_date, purchased_quantity }
        console.log(purchaseData);
    };
    // model handel //
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    const columns = [
        { field: 'id', headerName: 'Product Id', width: 130 },
        { field: 'date', headerName: 'Purchase Date', width: 130 },
        { field: 'name', headerName: 'Product Name', width: 130 },
        { field: 'category', headerName: 'Product Category', width: 130 },
        { field: 'quantity', headerName: 'Purchase Quantity', width: 150 },
        { field: 'status', headerName: 'Status', width: 130 },
       
       
       
    ];

    const rows = [ 
        { id: 1, date: '10-11-2024', name: 'Watch', category: 'Bands',quantity:'100',status: 'Unavailable'},
        { id: 2, date: '20-11-2024', name: 'Watch', category: 'glass',quantity:'600',status: 'Available'},
        { id: 3, date: '30-11-2024', name: 'Watch', category: 'strap',quantity:'300',status: 'Available'},
        { id: 4, date: '1-12-2024', name: 'Watch', category: 'dail',quantity:'200',status: 'Unavailable'},
        { id: 5, date: '10-12-2024', name: 'Watch', category: 'Bands',quantity:'10',status: 'Available'},
       
        
    ];

    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <>
            <div className="p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">
                    Purchase Materials
                </h1>


                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>



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
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="w-2/3 px-2 py-1 border rounded"
                                        placeholder="Enter Quantity"
                                        value={purchased_quantity}
                                        onChange={(e) => setPurchasedQuantity(e.target.value)}
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
            </div>
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
