import React from 'react'
import TableComponent from './TableComponent'
import AddCategoryForm from './AddCategoryForm'
import AddProductForm from './AddProductForm'
import ComponentList from './AddComponentForm'

function ProductConfigTable({columns, rows, reFetchTableData}) {
  return (
    <>
    <TableComponent columns={columns} rows={rows} />
    <AddCategoryForm reFetchTableData={reFetchTableData} />
    <AddProductForm/>
    <ComponentList reFetchTableData={reFetchTableData}/>
    </>
  )
}

export default ProductConfigTable
