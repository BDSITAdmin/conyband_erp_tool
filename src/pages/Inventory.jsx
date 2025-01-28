import React, { useState, useEffect } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import TableComponent from '../components/TableComponent';
import FinishGood from '../components/AddFinishGoodsForm';
import useFetch from '../hooks/useFetch';
import { format } from 'date-fns'; // Import format from date-fns

function ProductConfiguration() {
    const [selectedToggle, setSelectedToggle] = useState('Components');

    const apiEndpoints = {
        'Components': 'http://localhost:8080/api/v1/inventory-management/raw-materials',
        'Finished Goods': 'http://localhost:8080/api/v1/inventory-management/finished-goods',
    };

    // Fetch data using the selected API endpoint
    const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(apiEndpoints[selectedToggle]);

    useEffect(() => {
        reFetchTableData();
    }, [selectedToggle]);

    // Function to format dates
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'yyyy-MM-dd');
    };

    const columnDefinitions = {
        'Components': [
            { field: 'component_id', headerName: 'ID', width: 50 },
            { field: 'component_name', headerName: 'Name', width: 150 },
            { field: 'Component_Category', headerName: 'Category', width: 150 },
            { field: 'Available_Quantity', headerName: 'Available Quantity', width: 150 },
        ],
        
        'Finished Goods': [
            { field: 'Manufactured_Date', headerName: 'Date', width: 150 },
            { field: 'Product_Id', headerName: 'Product ID', width: 100 },
            { field: 'Product_Name', headerName: 'Product Name', width: 150 },
            { field: 'Manufactured_Quantity', headerName: 'Manufactured Quantity', width: 200 },
            { field: 'Available_Quantity', headerName: 'Available Quantity', width: 150 },
        ],
    };

    const columns = columnDefinitions[selectedToggle];

    // Format the Manufactured_Date field for 'Finish Good' section
    const formattedRows = rows.map((row) => {
        if (selectedToggle === 'Finished Goods' && row.Manufactured_Date) {
            return {
                ...row,
                Manufactured_Date: formatDate(row.Manufactured_Date),
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
            {selectedToggle === 'Finished Goods' && <FinishGood reFetchTableData={reFetchTableData} />}
        </div>
    );
}

export default ProductConfiguration;
