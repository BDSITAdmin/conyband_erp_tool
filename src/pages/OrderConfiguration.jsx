import React, { useEffect, useState } from 'react';
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

// console.log(rows)


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
  ];
   
  const transformedRows = rows.map((row) => ({
    ...row,
    id: row.order_id,
    productName:row.product_name,
    orderQuantity: row.order_quantity,
     // Add an id property using order_id
  }));

  return (
    <>
      {showComponent && (
        <OrderComponentModel
          viewAllId={viewAllId}
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
        <AddOrderForm />
      </div>
    </>
  );
}

export default OrderConfiguration;
