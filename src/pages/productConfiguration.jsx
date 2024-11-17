import React, {useState} from 'react'
import ToggleButtons from '../components/ToggleButtons'
import useFetch from '../hooks/useFetch';
import ProductConfigTable from '../components/ProductConfigTable';

function ProductConfiguration() {
  const [selectedToggle, setSelectedToggle] = useState("Component Category");

  const apiEndpoints = {
    "Component Category": "http://localhost:8080/api/v1/categories",
    "Component List": "http://localhost:8080/api/v1/components",
    "Product List": "http://localhost:8080/api/v1/products",
  };

  const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(apiEndpoints[selectedToggle]);
  
  // console.log(rows.length)
 

  const columnDefinitions = {
    "Component Category": [
      { field: "category_id", headerName: "Category Id",width: 150 },
      { field: "category_name", headerName: "Category Name", width: 150 },
    ],
    "Component List": [
      { field: "component_id", headerName: "Component Id", width: 150 },
      { field: "component_name", headerName: "Component Name",width: 150 },
      { field: "*category_name", headerName: "Category", width: 150 },
      { field: "Action", headerName: "Action", width: 150 },
    ],
    "Product List": [
      { field: "product_id", headerName: "Product Id", width: 100 },
      { field: "product_name", headerName: "Product Name", width: 150 },
      { field: "AllComponents", headerName: "All Components", width: 200 },
      { field: "Action", headerName: "Action", width: 200 },
    ],
  };

  const columns = columnDefinitions[selectedToggle];

  return (
    <>
    {/* navigation  */}
    <div className="p-6 w-full bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Product Configuration</h1>
    <ToggleButtons  
    data={Object.keys(apiEndpoints)}
    onChange={(value) => {
      setSelectedToggle(value);
    }}
    />
    {rows.length > 1 ?
      <ProductConfigTable columns={columns} rows={rows} reFetchTableData={reFetchTableData} /> :
      <h2 className='m-4' >No Data Found</h2>
    }
    </div>
    </>
  )
}

export default ProductConfiguration
