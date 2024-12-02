import React, { useState } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import TableComponent from '../components/TableComponent';
import FinishGood from '../components/AddFinishGoodsForm';
import useFetch from '../hooks/useFetch';

function ProductConfiguration() {
    const [selectedToggle, setSelectedToggle] = useState('Components');

    // API Endpoints for toggles
    const apiEndpoints = {
        Components: 'http://localhost:8080/api/v1/inventory-management/raw-materials',
        'Finish Good': 'http://localhost:8080/api/v1/inventory-management/finished-goods',
    };

    // Fetch data using the selected API endpoint
    const {
        data: rows = [],
        loading,
        error,
        reFetch: reFetchTableData,
    } = useFetch(apiEndpoints[selectedToggle]);

    // Column definitions for the tables
    const columnDefinitions = {
        Components: [
            { field: 'component_id', headerName: 'Id', width: 150 },
            { field: 'component_name', headerName: 'Name', width: 150 },
            { field: 'Component_Category', headerName: 'Category', width: 150 },
            { field: 'available_quantity', headerName: 'Available Quantity', width: 150 },
            { field: 'status', headerName: 'Status', width: 150 },
        ],
        'Finish Good': [
            { field: 'Manufactured_Date', headerName: 'Date', width: 150 },
            { field: 'product_id', headerName: 'Product Id', width: 150 },
            { field: 'product_name', headerName: 'Product Name', width: 150 },
            { field: 'Manufactured_Quantity', headerName: 'Manufactured Quantity', width: 150 },
            { field: 'Available_Quantity', headerName: 'Available Quantity', width: 150 },
        ],
    };

    const columns = columnDefinitions[selectedToggle];

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
            ) : rows.length > 0 ? (
                <TableComponent
                    columns={columns}
                    rows={rows}
                />
            ) : (
                <h2 className="m-4">No Data Found</h2>
            )}
            {selectedToggle === 'Finish Good' && <FinishGood reFetchTableData={reFetchTableData} />}
        </div>
    );
}

export default ProductConfiguration;
