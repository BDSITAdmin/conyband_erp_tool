import React, { useState, useEffect } from 'react';
import TableComponent from '../components/TableComponent';
import AddPurchase from '../components/AddPurchaseForm'; // Import AddPurchase component
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { format } from 'date-fns'; // Import format from date-fns

function PurchaseManagement() {
    const apiEndpoint = 'http://localhost:8080/api/v1/purchases';
    const [purchases, setPurchases] = useState([]);

    // Fetch purchase data
    const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(apiEndpoint);

    // Function to fetch component names based on component ID
    const fetchComponentName = async (componentId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/components/${componentId}`);
            return response.data.component_name || 'Unknown Component';
        } catch (error) {
            console.error('Error fetching component name:', error);
            return 'Unknown Component';
        }
    };

    useEffect(() => {
        // If data is available, update rows with component names
        const updateRowsWithComponentNames = async () => {
            if (rows && rows.length > 0) {
                const updatedRows = await Promise.all(
                    rows.map(async (purchase) => {
                        const componentName = await fetchComponentName(purchase.component_id);

                        // Format the purchase_date to only show the date part
                        const formattedDate = format(new Date(purchase.purchase_date), 'yyyy-MM-dd');

                        return { ...purchase, component_name: componentName, purchase_date: formattedDate };
                    })
                );
                setPurchases(updatedRows);
            }
        };

        updateRowsWithComponentNames();
    }, [rows]);

    // Define the column structure for the purchases table
    const columns = [
        { field: 'purchase_id', headerName: 'Purchase ID', width: 150 },
        { field: 'component_name', headerName: 'Component Name', width: 150 },
        { field: 'purchase_date', headerName: 'Purchase Date', width: 150 },
        { field: 'purchased_quantity', headerName: 'Purchased Quantity', width: 150 },
    ];

    return (
        <div className="w-full p-6 bg-gray-100 rounded-md">
            <h1 className="mb-4 text-2xl font-semibold">Purchase Management</h1>

           

            {loading ? (
                <h2 className="m-4">Loading...</h2>
            ) : error ? (
                <h2 className="m-4 text-red-500">Error: {error.message || 'Something went wrong'}</h2>
            ) : purchases.length > 0 ? (
                <TableComponent columns={columns} rows={purchases} />
            ) : (
                <h2 className="m-4">No Data Found</h2>
            )}
             {/* AddPurchase Component with reFetchTableData passed as prop */}
             <AddPurchase reFetchTableData={reFetchTableData} />
        </div>
    );
}

export default PurchaseManagement;
