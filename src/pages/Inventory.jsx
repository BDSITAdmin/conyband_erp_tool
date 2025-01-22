import React, { useState, useEffect } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import TableComponent from '../components/TableComponent';
import FinishGood from '../components/AddFinishGoodsForm';
import useFetch from '../hooks/useFetch';
import { format } from 'date-fns'; // Import format from date-fns

function ProductConfiguration() {
    const [selectedToggle, setSelectedToggle] = useState('Components');
    const [cachedData, setCachedData] = useState({}); // Cache for fetched data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);

    const apiEndpoints = {
        'Components': 'http://localhost:8080/api/v1/inventory-management/raw-materials',
        'Finished Goods': 'http://localhost:8080/api/v1/inventory-management/finished-goods',
    };

    useEffect(() => {
        // If data for the selected toggle is already cached, use it
        if (cachedData[selectedToggle]) {
            setRows(cachedData[selectedToggle]);
        } else {
            // Otherwise, fetch data from the API
            fetchData(apiEndpoints[selectedToggle]);
        }
    }, [selectedToggle]);

    const fetchData = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Cache the data
            setCachedData((prev) => ({
                ...prev,
                [selectedToggle]: data,
            }));
            setRows(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to format dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd-MM-yyyy');
    };

    const columnDefinitions = {
        'Components': [
            { field: 'component_id', headerName: 'ID', width: 50 },
            { field: 'component_name', headerName: 'Name', width: 100 },
            { field: 'Component_Category', headerName: 'Category', width: 130 },
            { field: 'Available_Quantity', headerName: 'Available Quantity', width: 150 },
        ],
        'Finished Goods': [
            { field: 'Manufactured_Date', headerName: 'Date', width: 150 },
            { field: 'product_id', headerName: 'Product ID', width: 90 },
            { field: 'product_name', headerName: 'Product Name', width: 120 },
            { field: 'Manufactured_Quantity', headerName: 'Manufactured Quantity', width: 170 },
            { field: 'Available_Quantity', headerName: 'Available Quantity', width: 150 },
        ],
    };

    const columns = columnDefinitions[selectedToggle];

    // Format the Manufactured_Date field for 'Finished Goods' section
    const formattedRows = rows.map((row) => {
        if (selectedToggle === 'Finished Goods' && row.Manufactured_Date) {
            return {
                ...row,
                Manufactured_Date: formatDate(row.Manufactured_Date), // Formats to 'dd-MM-yyyy'
            };
        }
        return row;
    });

    return (
        <div className="w-full p-6 bg-gray-100 rounded-md">
            <h1 className="mb-4 text-2xl font-semibold">Inventory Management</h1>
            <ToggleButtons
                data={Object.keys(apiEndpoints)}
                onChange={(value) => setSelectedToggle(value)}
            />
            {loading ? (
                <h2 className="m-4">Loading...</h2>
            ) : error ? (
                <h2 className="m-4 text-red-500">Error: {error.message || 'Something went wrong'}</h2>
            ) : formattedRows.length > 0 ? (
                <TableComponent
                    columns={columns}
                    rows={formattedRows}
                />
            ) : (
                <h2 className="m-4">No Data Found</h2>
            )}
            {selectedToggle === 'Finished Goods' && <FinishGood reFetchTableData={() => fetchData(apiEndpoints['Finished Goods'])} />}
        </div>
    );
}

export default ProductConfiguration;
