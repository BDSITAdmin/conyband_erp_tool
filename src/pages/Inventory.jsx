import React, { useEffect, useState } from 'react'
import ToggleButtons from '../components/ToggleButtons'
import useFetch from '../hooks/useFetch';
import TableComponent from '../components/TableComponent';
import ViewComponentFromProduct from '../components/ViewComponentFromProduct';
import FinishGood from '../components/AddFinishGoodsForm';


function ProductConfiguration() {
  const [selectedToggle, setSelectedToggle] = useState("Raw Materials");
  const [showComponet, setShowComponent] = useState(false);


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


  const apiEndpoints = {
    "Raw Materials": "http://localhost:8080/api/v1/inventory-management/raw-materials",
    "Finish Good": "http://localhost:8080/api/v1/inventory-management/finished-goods",
    
  };

  const handleView = (productId) => {
    // console.log(`View details for Product ID: ${productId}`);
    setShowComponent(true)
  };


  const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(apiEndpoints[selectedToggle]);




  useEffect(() => {
    reFetchTableData()
  }, [selectedToggle])


  const columnDefinitions = {
    "Raw Materials": [
      { field: "component_id", headerName: "Component Id", width: 150 },
      { field: "component_name", headerName: "Component Name", width: 150 },
      { field: "component_category", headerName: "Component Category", width: 150 },
      { field: "available_quantity", headerName: "Available Quantity", width: 150 },
      { field: "status", headerName: "Status", width: 150 },
      { field: "action", headerName: "Action", width: 150 },
    ],
    "Finish Good": [
      { field: "date", headerName: "Date", width: 150 },
      { field: "product_id", headerName: "Product Id", width: 150 },
      { field: "product_name", headerName: "Product Name", width: 150 },
      { field: "manufactured_quantity", headerName: "Manufactured Quantity", width: 150 },
      { field: "available_quantity", headerName: "Available Quantity", width: 150 },
      { field: "action", headerName: "Action", width: 150 },
     
    ],
  };

  const columns = columnDefinitions[selectedToggle];

  return (
    <>
      {showComponet && <ViewComponentFromProduct data={dataToView} setShowComponent={setShowComponent} />}
      <div className="w-full p-6 bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Inventory Management</h1>
        <ToggleButtons
          data={Object.keys(apiEndpoints)}
          onChange={(value) => {
            setSelectedToggle(value);
          }}
        />
        {rows.length > 1 ?
          <TableComponent
            columns={columns}
            rows={rows}
            reFetchTableData={reFetchTableData}
          /> :
          <h2 className='m-4' >No Data Found</h2>
        }
        {selectedToggle === "Raw Materials"}
        {selectedToggle === "Finish Good" && <FinishGood reFetchTableData={reFetchTableData} />}
      </div>
    </>
  )
}

export default ProductConfiguration
