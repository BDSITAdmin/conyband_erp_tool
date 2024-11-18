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
        { field: 'firstName', headerName: 'Order Name', width: 150 },
        { field: 'lastName', headerName: 'Order Qty', width: 150 },
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
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
