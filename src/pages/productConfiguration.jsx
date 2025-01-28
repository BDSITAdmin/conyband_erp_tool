import React, { useState, useEffect } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import useFetch from '../hooks/useFetch';
import TableComponent from '../components/TableComponent';
import AddCategoryForm from '../components/AddCategoryForm';
import AddProductForm from '../components/AddProductForm';
import ComponentList from '../components/AddComponentForm';
import ViewComponentFromProduct from '../components/ViewComponentFromProduct';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import { Tooltip, MenuItem } from '@mui/material';
import axios from 'axios';

function ProductConfiguration() {
  const [selectedToggle, setSelectedToggle] = useState("Component Category");
  const [showComponent, setShowComponent] = useState(false);
  const [viewAllId, setViewAllId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const apiEndpoints = {
    "Component Category": "http://localhost:8080/api/v1/categories",
    "Component List": "http://localhost:8080/api/v1/components",
    "Product List": "http://localhost:8080/api/v1/productConfiguration/products",
  };

  const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch(apiEndpoints[selectedToggle]);

  useEffect(() => {
    reFetchTableData();
  }, [selectedToggle]);

  const handleView = (productId) => {
    setViewAllId(productId);
    setShowComponent(true);
  };

  const handleDelete = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete || !deleteType) return;

    const endpoints = {
      category: `http://localhost:8080/api/v1/categories/${itemToDelete}`,
      component: `http://localhost:8080/api/v1/components/${itemToDelete}`,
      product: `http://localhost:8080/api/v1/productConfiguration/products/${itemToDelete}`,
    };

    try {
      const response = await axios.delete(endpoints[deleteType]);
      if (response.status === 200) {
        setSuccessMessage(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deleted successfully!`);
        setTimeout(() => setSuccessMessage(null), 3000);
        reFetchTableData();
      }
    } catch (error) {
      setErrorMessage(`Error deleting ${deleteType}: ${error.response?.data?.message || 'Unknown error occurred'}`);
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setShowConfirmModal(false);
      setItemToDelete(null);
      setDeleteType(null);
    }
  };

  const handleEditCategory = async (id) => {
    const categoryName = prompt("Enter the new category name:");
    if (categoryName) {
      try {
        const response = await axios.put(`http://localhost:8080/api/v1/categories/${id}`, {
          category_name: categoryName,
        });
        if (response.status === 200) {
          setSuccessMessage('Category updated successfully!');
          setTimeout(() => setSuccessMessage(null), 3000);
          reFetchTableData();
        }
      } catch (error) {
        setErrorMessage('Error updating category!');
      }
    }
  };

  const columnDefinitions = {
    "Component Category": [
      { field: "category_id", headerName: "ID", width: 50 },
      { field: "category_name", headerName: "Name", width: 150 },
      {
        field: "Action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => (
          <Tooltip
            title={
              <div className="flex flex-col">
                <MenuItem onClick={() => handleEditCategory(params.row?.category_id)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(params.row?.category_id, 'category')}>Delete</MenuItem>
              </div>
            }
            placement="bottom"
          >
            <span style={{ color: 'black', cursor: 'pointer', fontSize: '24px' }}>
              &#x22EE;
            </span>
          </Tooltip>
        ),
      },
    ],
    "Component List": [
      { field: "component_id", headerName: "ID", width: 50 },
      { field: "component_name", headerName: "Name", width: 150 },
      {
        field: "Action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => (
          <Tooltip
            title={
              <div className="flex flex-col">
                <MenuItem onClick={() => handleDelete(params.row?.component_id, 'component')}>Delete</MenuItem>
              </div>
            }
            placement="bottom"
          >
            <span style={{ color: 'black', cursor: 'pointer', fontSize: '24px' }}>
              &#x22EE;
            </span>
          </Tooltip>
        ),
      },
    ],
    "Product List": [
      { field: "product_id", headerName: "ID", width: 50 },
      { field: "product_name", headerName: "Name", width: 150 },
      {
        field: "AllComponents",
        headerName: "All Components",
        width: 150,
        renderCell: (params) => (
          <span
            onClick={() => handleView(params.row?.product_id)}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            View
          </span>
        ),
      },
      {
        field: "Action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => (
          <Tooltip
            title={
              <div className="flex flex-col">
                <MenuItem onClick={() => handleDelete(params.row?.product_id, 'product')}>Delete</MenuItem>
              </div>
            }
            placement="bottom"
          >
            <span style={{ color: 'black', cursor: 'pointer', fontSize: '24px' }}>
              &#x22EE;
            </span>
          </Tooltip>
        ),
      },
    ],
  };

  const columns = columnDefinitions[selectedToggle];

  return (
    <>
      {successMessage && <SuccessAlert message={successMessage} />}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {showComponent && <ViewComponentFromProduct viewAllId={viewAllId} data={rows} setShowComponent={setShowComponent} />}

      <div className="w-full p-6 bg-gray-100 rounded-md">
        <h1 className="mb-4 text-2xl font-semibold">Configuration</h1>
        <ToggleButtons
          data={Object.keys(apiEndpoints)}
          onChange={(value) => setSelectedToggle(value)}
        />
        {rows.length > 0 ? (
          <TableComponent
            columns={columns}
            rows={rows}
            reFetchTableData={reFetchTableData}
          />
        ) : (
          <h2 className="m-4">No Data Found</h2>
        )}
        {selectedToggle === "Component Category" && <AddCategoryForm reFetchTableData={reFetchTableData} />}
        {selectedToggle === "Component List" && <ComponentList reFetchTableData={reFetchTableData} />}
        {selectedToggle === "Product List" && <AddProductForm reFetchTableData={reFetchTableData} />}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-80">
            <h2 className="mb-4 text-lg font-medium text-gray-800">
              Are you sure you want to delete this {deleteType}?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductConfiguration;
