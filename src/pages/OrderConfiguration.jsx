import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import AddOrderForm from '../components/AddOrderForm'
import OrderTable from '../components/OrderTable';
import OrderComponentModel from '../components/OrderComponentModel';



function OrderConfiguration() {
    const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch();
    const [showComponet, setShowComponent]= useState(false);


    const handleView = (productId) => {
        // console.log(`View details for Product ID: ${productId}`);
        setShowComponent(true)
      };

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 120 },
        { field: 'productName', headerName: 'Product Name', width: 150 },
        { field: 'orderQuantity', headerName: 'Order Quantity', width: 150 },
        {
            field: "AllComponents",
            headerName: "All Components",
            width: 200,
            renderCell: (params) => (
              <span
                onClick={() => handleView(params.row.product_id)}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                View
              </span>
            ),
          },
      ];
      
      const row = [
        { id: 1, productName: 'Snow', orderQuantity:35 },
        { id: 2, productName: 'Lannister', orderQuantity: 42 },
        { id: 3, productName: 'Lannister', orderQuantity: 45 },
        { id: 4, productName: 'Stark', orderQuantity: 16 },
        { id: 5, productName: 'Targaryen', orderQuantity:23 },
        { id: 6, productName: 'Melisandre', orderQuantity: 50 },
        { id: 7, productName: 'Clifford', orderQuantity: 44 },
        { id: 8, productName: 'Frances', orderQuantity: 36 },
        { id: 9, productName: 'Roxie', orderQuantity: 65 },
      ];


      const dataToView = [
        {
          "componentName": "yogi123",
          "totalRequired": 10,
          "available": 8,
          "shortage": 2
        },
        {
          "componentName": "componentABC",
          "totalRequired": 20,
          "available": 15,
          "shortage": 5
        },
        {
          "componentName": "componentXYZ",
          "totalRequired": 30,
          "available": 30,
          "shortage": 0
        },
        {
          "componentName": "componentLMN",
          "totalRequired": 5,
          "available": 3,
          "shortage": 2
        }
      ]


    useEffect(() => {
        reFetchTableData()
    }, [])

    return (
        <>
        {showComponet && <OrderComponentModel data={dataToView} setShowComponent = {setShowComponent}  /> }
            <div className="w-full p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">Order Configuration</h1>
                
                {/* {rows.length > 1 ?
                    <OrderTable/> :
                    <h2 className='m-4' >No Data Found</h2>
                } */}

            <OrderTable columns={columns} rows={row} />
                
            </div>
            <div className="flex justify-end">
                <AddOrderForm/>
            </div>
            
        </>
    )
}

export default OrderConfiguration
