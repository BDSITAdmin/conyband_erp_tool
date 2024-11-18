import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddCategoryForm from '../components/AddCategoryForm';

function TableComponent({columns, rows}) {
  const paginationModel = { page: 0, pageSize: 5 };
  const row = rows.map(row => ({ id: row.category_id, ...row }));
  console.log(row)

  return (
    <>
    <Paper sx={{ height: 400, width: '100%', marginTop:"20px" }}>
      <DataGrid
        rows={row}
        columns={columns}
        initialState={{ pagination: { paginationModel }}}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(row) => row.id || Math.random().toString(36).substr(2, 9)}
        sx={{ border: 0,borderRadius:"8px" }}
      />
    </Paper>
    
    </>
  )
}

export default TableComponent