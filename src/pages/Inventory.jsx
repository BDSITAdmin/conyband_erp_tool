import React, { useState } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import TableComponent from '../components/TableComponent';
import ViewComponentFromProduct from '../components/ViewComponentFromProduct';
import FinishGood from '../components/AddFinishGoodsForm';
import useFetch from '../hooks/useFetch';

function ProductConfiguration() {
    const [selectedToggle, setSelectedToggle] = useState('Raw Materials');
    const [showComponent, setShowComponent] = useState(false);
    const [dataToView, setDataToView] = useState(null);

    // API Endpoints for toggles
    const apiEndpoints = {
        'Raw Materials': 'http://localhost:8080/api/v1/inventory-management/raw-materials',
        'Finish Good': 'http://localhost:8080/api/v1/inventory-management/finished-goods',
    };

    // Fetch data using the selected API endpoint
    const {
        data: rows = [],
        loading,
        error,
        reFetch: reFetchTableData,
    } = useFetch(apiEndpoints[selectedToggle]);

    // Handle viewing row details
    const handleView = (productId) => {
        const selectedData = rows.find((row) =>
            selectedToggle === 'Raw Materials'
                ? row.component_id === productId
                : row.product_id === productId
        );
        setDataToView(selectedData);
        setShowComponent(true);
    };

    const columnDefinitions = {
        'Raw Materials': [
            { field: 'component_id', headerName: 'Component Id', width: 150 },
            { field: 'component_name', headerName: 'Component Name', width: 150 },
            { field: 'Component_Category', headerName: 'Component Category', width: 150 },
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
        <>
            {showComponent && (
                <ViewComponentFromProduct
                    data={dataToView}
                    setShowComponent={setShowComponent}
                />
            )}
            <div className="w-full p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">Inventory Management</h1>
                <ToggleButtons
                    data={Object.keys(apiEndpoints)}
                    onChange={(value) => {
                        setSelectedToggle(value);
                        setShowComponent(false); // Close any open components
                    }}
                />
                {loading ? (
                    <h2 className="m-4">Loading...</h2>
                ) : error ? (
                    <h2 className="m-4 text-red-500">Error: {error.message}</h2>
                ) : rows.length > 0 ? (
                    <TableComponent
                        columns={columns}
                        rows={rows}
                        // onRowClick={(row) =>
                        //     handleView(
                        //         selectedToggle === 'Raw Materials'
                        //             ? row.component_id
                        //             : row.product_id
                        //     )
                        // }
                    />
                ) : (
                    <h2 className="m-4">No Data Found</h2>
                )}
                {selectedToggle === 'Finish Good' && <FinishGood reFetchTableData={reFetchTableData} />}
            </div>
        </>
    );
}

export default ProductConfiguration;
