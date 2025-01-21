import React, { useState } from 'react';
import axios from 'axios';
import AddOrderForm from '../components/AddOrderForm';
import OrderTable from '../components/OrderTable';
import OrderComponentModel from '../components/OrderComponentModel';
import useFetch from '../hooks/useFetch';

function OrderConfiguration() {
  const [showComponent, setShowComponent] = useState(false);
  const [viewAllId, setViewAllId] = useState(null);

  const { data: rows = [], loading, error, reFetch: reFetchTableData } = useFetch(
    'http://localhost:8080/api/v1/productConfiguration/order-management'
  );

  const [localRows, setLocalRows] = useState(rows); // Maintain a local copy of rows for immediate updates

  // Update localRows when rows change from the API
  React.useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  const handleConfirmOrder = async (product_id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/order-config/confirm-order/${product_id}`
      );

      if (response.status === 200) {
        alert('Order confirmed successfully!');

        // Update the status of the specific order in localRows
        setLocalRows((prevRows) =>
          prevRows.map((row) =>
            row.order_id === orderId ? { ...row, status: 'Confirmed' } : row
          )
        );
      } else {
        alert('Failed to confirm the order.');
      }
    } catch (error) {
      console.error('Error confirming the order:', error);
      alert('An error occurred while confirming the order.');
    }
  };

  const handleViewAll = (productId) => {
    setViewAllId(productId);
    setShowComponent(true);
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 120 },
    { field: 'productName', headerName: 'Product Name', width: 150 },
    { field: 'orderQuantity', headerName: 'Order Quantity', width: 150 },
    {
      field: 'AllComponents',
      headerName: 'All Components',
      width: 200,
      renderCell: (params) => (
        <span
          onClick={() => handleViewAll(params.row.product_id)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          View
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => <span>{params.row.status || 'Pending'}</span>,
    },
    {
      field: 'confirmOrder',
      headerName: 'Confirm Order',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleConfirmOrder(params.row.id)}
          disabled={params.row.status === 'Confirmed'}
          style={{
            cursor: params.row.status === 'Confirmed' ? 'not-allowed' : 'pointer',
            backgroundColor: params.row.status === 'Confirmed' ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
          }}
        >
          {params.row.status === 'Confirmed' ? 'Confirmed' : 'Confirm'}
        </button>
      ),
    },
  ];

  const transformedRows = localRows.map((row) => ({
    ...row,
    id: row.order_id,
    productName: row.product_name,
    orderQuantity: row.order_quantity,
  }));

  return (
    <>
      {showComponent && (
        <OrderComponentModel
          viewAllId={viewAllId}
          data={localRows}
          setShowComponent={setShowComponent}
        />
      )}
      <div className="w-full p-6 bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Order Management</h1>
        {localRows?.length > 0 ? (
          <OrderTable columns={columns} rows={transformedRows} />
        ) : (
          <h2 className="m-4">No Data Found</h2>
        )}
      </div>
      <div className="flex justify-end">
        <AddOrderForm reFetchTableData={reFetchTableData} />
      </div>
    </>
  );
}

export default OrderConfiguration;
