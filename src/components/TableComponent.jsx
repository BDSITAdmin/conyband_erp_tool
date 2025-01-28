import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, Paper, Modal, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';


function TableComponent({ columns, rows, reFetchTableData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const paginationModel = { page: 0, pageSize: 10 };

  const row = rows.map((row) => ({ id: row.category_id, ...row }));

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget); 
    setSelectedRowId(id);
  };
  
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = (id) => {
    const rowData = rows.find((row) => row.category_id === id);
    setEditData(rowData || {}); 
    setEditModalOpen(true);
    handleMenuClose();
  };

  // Handle update API call
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/categories/${editData.category_id}`, editData);
      if (response.status === 200) {
        console.log('Category updated successfully');
        reFetchTableData(); 
        setEditModalOpen(false); 
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/categories/${id}`);
      if (response.status === 200) {
        console.log('Category deleted successfully');
        reFetchTableData();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
    handleMenuClose();
  };

  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <div>
        <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
          <MoreVertIcon />
        </IconButton>
        
        {anchorEl && selectedRowId === params.row.id && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MenuItem onClick={() => handleEdit(params.row.id)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>Delete</MenuItem>
          </Menu>
        )}
      </div>
    ),
  };
  
  

  const updatedColumns = [...columns, actionColumn];

  return (
    <>
      <Paper sx={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={row}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row.id || Math.random().toString(36).substr(2, 9)}
          sx={{ border: 0, borderRadius: '8px' }}
        />
      </Paper>

      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ padding: 3, width: '400px' }}>
          <h3 className='text-xl text-bold'>Edit Category</h3>
          <TextField
            fullWidth
            label="Category Name"
            value={editData.name || ''}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            margin="normal"
          />
          <button
                onClick={handleUpdate}
                className="px-4 py-2  text-white flex  mx-auto my-3 items-center justify-center bg-[#10B981] rounded-full "
            >
             Save Changes
            </button>
        </Paper>
      </Modal>
    </>
  );
}

export default TableComponent;
