import React from 'react'
import TableComponent from './TableComponent'
import AddCategoryForm from './AddCategoryForm'
import AddProductForm from './AddProductForm'
import ComponentList from './AddComponentForm'

function ProductConfigTable({columns, rows, reFetchTableData, selectedToggle}) {
  console.log(selectedToggle)
  return (
    <>
    <TableComponent columns={columns} rows={rows} />
    { selectedToggle ==="Component Category" && <AddCategoryForm reFetchTableData={reFetchTableData} />}
    { selectedToggle ==="Product List" && <AddProductForm/>}
    {selectedToggle ==="Component List" && <ComponentList reFetchTableData={reFetchTableData}/>}
    </>
  )
}

export default ProductConfigTable
