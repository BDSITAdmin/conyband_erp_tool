import React, { useState } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import TableComponent from '../components/TableComponent';
import ViewComponentFromProduct from '../components/ViewComponentFromProduct';
import FinishGood from '../components/AddFinishGoodsForm';

function ProductConfiguration() {
    const [selectedToggle, setSelectedToggle] = useState('Raw Materials');
    const [showComponent, setShowComponent] = useState(false);
    const [dataToView, setDataToView] = useState(null);

    const apiEndpoints = {
        'Raw Materials': '',
        'Finish Good': '',
    };

    const handleView = (productId) => {
        const selectedData = rows.find((row) => row.component_id === productId);
        setDataToView(selectedData);
        setShowComponent(true);
    };

    const columnDefinitions = {
        'Raw Materials': [
            { field: 'component_id', headerName: 'Component Id', width: 150 },
            { field: 'component_name', headerName: 'Component Name', width: 150 },
            { field: 'component_category', headerName: 'Component Category', width: 150 },
            { field: 'available_quantity', headerName: 'Available Quantity', width: 150 },
            { field: 'status', headerName: 'Status', width: 150 },
        ],
        'Finish Good': [
            { field: 'date', headerName: 'Date', width: 150 },
            { field: 'product_id', headerName: 'Product Id', width: 150 },
            { field: 'product_name', headerName: 'Product Name', width: 150 },
            { field: 'manufactured_quantity', headerName: 'Manufactured Quantity', width: 150 },
            { field: 'available_quantity', headerName: 'Available Quantity', width: 150 },
        ],
    };

    const rows = [
        {
            component_id: 1,date: '10-11-2024',component_name: 'strap',component_category: 'Bands',available_quantity: '100',status: 'Unavailable',
            product_id: 1,product_name: 'Watch',manufactured_quantity: '100',
        },
        {
            component_id: 2,date: '1-12-2024',component_name: 'strap',component_category: 'Bands',available_quantity: '50',status: 'Unavailable',
            product_id: 2,product_name: 'Watch',manufactured_quantity: '20',
        },
    ];

    const columns = columnDefinitions[selectedToggle];

    return (
        <>
            {showComponent && (
                <ViewComponentFromProduct data={dataToView} setShowComponent={setShowComponent} />
            )}
            <div className="w-full p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">Inventory Management</h1>
                <ToggleButtons
                    data={Object.keys(apiEndpoints)}
                    onChange={(value) => {
                        setSelectedToggle(value);
                    }}
                />
                {rows.length > 0 ? (
                    <TableComponent
                        columns={columns}
                        rows={rows}
                        onRowClick={(row) => handleView(row.component_id)} // Pass row data on click
                    />
                ) : (
                    <h2 className="m-4">No Data Found</h2>
                )}
                {selectedToggle === 'Finish Good' && <FinishGood />}
            </div>
        </>
    );
}

export default ProductConfiguration;
