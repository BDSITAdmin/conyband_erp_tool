import React, { useEffect, useState } from 'react'
import ToggleButtons from '../components/ToggleButtons'
import useFetch from '../hooks/useFetch';
import TableComponent from '../components/TableComponent';
import AddCategoryForm from '../components/AddCategoryForm'
import AddProductForm from '../components/AddProductForm'
import ComponentList from '../components/AddComponentForm'
// import TableModal from '../components/managementView';
import ViewComponentFromProduct from '../components/ViewComponentFromProduct';


function ProductConfiguration() {
  const [selectedToggle, setSelectedToggle] = useState("Component Category");
  const [showComponet, setShowComponent] = useState(false);
  const [viewAllId, SetViewAllId] = useState();


  const apiEndpoints = {
    "Component Category": "http://localhost:8080/api/v1/categories",
    "Component List": "http://localhost:8080/api/v1/components",
    "Product List": "http://localhost:8080/api/v1/productConfiguration/products",  
  };

  const handleView = (productId) => {
    // console.log(`View details for Product ID: ${productId}`);
    SetViewAllId(productId)
    setShowComponent(true)
  };


  const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(apiEndpoints[selectedToggle]);

// console.log(rows)


  useEffect(() => {
    reFetchTableData()
  }, [selectedToggle])


  const columnDefinitions = {
    "Component Category": [
      { field: "category_id", headerName: "ID", width: 150 },
      { field: "category_name", headerName: "Name", width: 150 },
    ],
    "Component List": [
      { field: "component_id", headerName: "ID", width: 150 },
      { field: "component_name", headerName: "Name", width: 150 },
      //{ field: "category_id", headerName: "Category", width: 150 },
    ],
    "Product List": [
      { field: "product_id", headerName: "ID", width: 100 },
      { field: "product_name", headerName: "Name", width: 150 },
      {
        field: "AllComponents",
        headerName: "All Components",
        width: 200,
        renderCell: (params) => (
          <span
            onClick={() => handleView(params.row?.product_id)}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            View
          </span>
        ),
      },
    ],
  };

  const columns = columnDefinitions[selectedToggle];
  console.log(rows)

  return (
    <>
  {showComponet &&<ViewComponentFromProduct viewAllId={viewAllId} data= {rows}  setShowComponent = {setShowComponent} />}
    <div className="w-full p-6 bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Configuration</h1>
    <ToggleButtons  
    data={Object.keys(apiEndpoints)}
    onChange={(value) => {
      setSelectedToggle(value);
    }}
    />
    {rows.length > 0 ?
      <TableComponent 
      columns={columns} 
      rows={rows} 
      reFetchTableData={reFetchTableData} 
      /> :
      <h2 className='m-4' >No Data Found</h2>
    }
    { selectedToggle ==="Component Category" && <AddCategoryForm reFetchTableData={reFetchTableData} />}
    {selectedToggle ==="Component List" && <ComponentList reFetchTableData={reFetchTableData}/>}
    { selectedToggle ==="Product List" && <AddProductForm reFetchTableData={reFetchTableData}/>}
    </div>
    </>
  )
}

export default ProductConfiguration
