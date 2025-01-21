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

const handleStatusChange = async (newStatus) => {
  if (newStatus === "Confirm") {
    try {
      const response = await fetch(`http:localhost:8080/api/v1/order-config/confirm-order${order_config_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Order confirmed successfully!");
        reFetchTableData(); // Refresh the data after confirmation
      } else {
        alert("Failed to confirm the order.");
      }
    } catch (error) {
     // console.error("Error confirming the order:", error);
      alert("An error occurred while confirming the order.");
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

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
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const color =
          params.row.status === "Pending"
            ? "red"
            : params.row.status === "Confirm"
            ? "green"
            : "black";
  
        return (
          <div>
            <span style={{ color, fontWeight: "bold" }}>
              {params.row.status}
            </span>
            <select
              value={params.row.status}
              onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
              style={{ padding: "0px", marginLeft: "10px" }}
            >
              <option value="Pending">Pending</option>
              <option value="Confirm">Confirm</option>
            </select>
          </div>
        );
      },
    },
    // {
    //   field: 'Status',
    //   headerName: 'Status',
    //   width: 200,
    //   renderCell: (params) => (
    //     <span
    //       onClick={() => handleViewAll(params.row.product_id)}
    //       style={{ color: 'red', cursor: 'pointer' }}
    //     >
    //       Pending
    //     </span>
    //   ),
    // },
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
        <AddOrderForm reFetchTableData={reFetchTableData}  />
      </div>
    </>
  );
}

export default OrderConfiguration;
