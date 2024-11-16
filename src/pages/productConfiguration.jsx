import React, {useState} from 'react'
import ToggleButtons from '../components/ToggleButtons'
import TableComponent from '../components/TableComponent'
import useFetch from '../hooks/useFetch';
import AddCategoryForm from '../components/AddCategoryForm';

function ProductConfiguration() {
  const [selectedToggle, setSelectedToggle] = useState("Component Category");

  const apiEndpoints = {
    "Component Category": "http://localhost:8080/api/v1/categories",
    "Component List": "http://localhost:8080/api/v1/components",
    "Product List": "http://localhost:8080/api/v1/purchases",
  };

  const { data: rows, loading, error, reFetch: reFetchCategories } = useFetch(apiEndpoints[selectedToggle]);
 

  const columnDefinitions = {
    "Component Category": [
      { field: "category_id", headerName: "Component Id",width: 200 },
      { field: "category_name", headerName: "Category Name", width: 200 },
    ],
    "Component List": [
      { field: "component_id", headerName: "Component Id", width: 100 },
      { field: "component_name", headerName: "Component Name",width: 200 },
      { field: "category_id", headerName: "Component Category", width: 250 },
      { field: "Action", headerName: "Action", width: 200 },
    ],
    "Product List": [
      { field: "ProductId", headerName: "Product Id", width: 100 },
      { field: "ProductName", headerName: "Product Name", width: 200 },
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
      reFetch(); 
    }}
    />
    {rows.length > 1 && <TableComponent columns={columns} rows={rows} />}
    {rows.length<1 && <h2 className='m-4' >No Data Found</h2>}
    <AddCategoryForm reFetchCategories={reFetchCategories} />
    </div>
    </>
  )
}

export default ProductConfiguration
