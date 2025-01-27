import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddOrderForm from '../components/AddOrderForm';
import OrderTable from '../components/OrderTable';
import OrderComponentModel from '../components/OrderComponentModel';
import useFetch from '../hooks/useFetch';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';

function OrderConfiguration() {
  const [showComponent, setShowComponent] = useState(false);
  const [viewAllId, setViewAllId] = useState(null);
  const [viewOrderQuantity, setViewOrderQuantity] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(
    'http://localhost:8080/api/v1/productConfiguration/order-management'
  );



  const handleConfirmOrder = async (orderId) => {
    const payload = {
      order_config_id: orderId, // Payload to be sent to the API
    };



    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/order-config/confirm-order`,
        payload
      );

      if (response.status === 200) {
        setSuccessMessage(" Confirmed Order added successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
        reFetchTableData();

      } else {

        alert('Failed to confirm the order.');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Failed to add finished good. Please try again."
      );
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };



  const handleViewAll = (productId, order_quantity) => {
    setViewAllId(productId);
    setViewOrderQuantity(order_quantity);
    console.log('Product ID:', productId);
    console.log('Order Quantity:', order_quantity);
    setShowComponent(true);
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 80 },
    { field: 'productName', headerName: 'Product Name', width: 150 },
    { field: 'orderQuantity', headerName: 'Order Quantity', width: 120 },
    {
      field: 'AllComponents',
      headerName: 'All Components',
      width: 140,
      renderCell: (params) => (
        <span
          onClick={() => handleViewAll(params.row.product_id, params.row.order_quantity)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          View
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.status === 'Confirmed' ? 'green' : 'red', // Conditional color
            fontWeight: 'bold',
          }}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: 'confirmOrder',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleConfirmOrder(params.row.id)}
          disabled={params.row.status === 'Confirmed'}
          style={{
            cursor: params.row.status === 'Confirmed' ? 'not-allowed' : 'pointer',
            backgroundColor: params.row.status === 'Confirmed' ? 'gray' : 'green', // Conditional background color
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            height: '30px',
            width: '120px',
            display: 'flex',
            marginTop: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
          }}
        >
          {params.row.status === 'Confirmed' ? 'Confirmed' : 'Confirm Order'} {/* Conditional button title */}
        </button>
      ),
    },
  ];


  const transformedRows = rows.map((row) => ({
    ...row,
    id: row.order_id,
    productName: row.product_name,
    orderQuantity: row.order_quantity,
    status: row.is_confirmed ? 'Confirmed' : 'Pending', // Set status based on is_confirmed
  }));

  return (
    <>

      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {showComponent && (
        <OrderComponentModel
          viewAllId={viewAllId}
          viewOrderQuantity={viewOrderQuantity}
          data={rows}
          setShowComponent={setShowComponent}
        />
      )}
      <div className="w-full p-6 bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Order Management</h1>
        {rows?.length > 0 ? (
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