import React, {useState} from 'react'
import ToggleButtons from '../components/ToggleButtons'
import TableComponent from '../components/TableComponent'
import useFetch from '../hooks/useFetch';

function ProductConfiguration() {
  const [selectedToggle, setSelectedToggle] = useState("Component Category");

  const apiEndpoints = {
    "Component Category": "http://localhost:8080/api/v1/categories",
    "Component List": "http://localhost:8080/api/v1/components",
    "Product List": "http://localhost:8080/api/v1/purchases",
  };

  const { data: rows, loading, error, reFetch } = useFetch(apiEndpoints[selectedToggle]);


  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
 

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
    {length > 1 && <TableComponent columns={columns} rows={rows} />}
    {length<1 && <h2 className='m-4' >No Data Found</h2>}
    </div>
    </>
  )
}

export default ProductConfiguration
