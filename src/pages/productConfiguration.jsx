import React from 'react'
import ToggleButtons from '../components/ToggleButtons'
import TableComponent from '../components/TableComponent'

function ProductConfiguration() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  return (
    <>
    {/* navigation  */}
    <div className="p-6 w-full bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Product Configuration</h1>
    <ToggleButtons  data={["Component Category", "Component List", "Product List"]} />
    <TableComponent columns={columns} />
    </div>
    </>
  )
}

export default ProductConfiguration
