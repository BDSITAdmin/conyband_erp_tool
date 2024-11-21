
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddPurchase from '../components/AddPurchaseForm'


const Table = () => {

    const columns = [
        { field: 'id', headerName: 'Product Id', width: 130 },
        { field: 'date', headerName: 'Purchase Date', width: 130 },
        { field: 'name', headerName: 'Product Name', width: 130 },
        { field: 'category', headerName: 'Product Category', width: 130 },
        { field: 'quantity', headerName: 'Purchase Quantity', width: 150 },
        { field: 'status', headerName: 'Status', width: 130 },
       
       
       
    ];

    const rows = [ 
        { id: 1, date: '10-11-2024', name: 'Watch', category: 'Bands',quantity:'100',status: 'Unavailable'},
        { id: 2, date: '20-11-2024', name: 'Watch', category: 'glass',quantity:'600',status: 'Available'},
        { id: 3, date: '30-11-2024', name: 'Watch', category: 'strap',quantity:'300',status: 'Available'},
        { id: 4, date: '1-12-2024', name: 'Watch', category: 'dail',quantity:'200',status: 'Unavailable'},
        { id: 5, date: '10-12-2024', name: 'Watch', category: 'Bands',quantity:'10',status: 'Available'},
       
        
    ];

    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <>
            <div className="p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">
                    Purchase Materials
                </h1>


                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
            <AddPurchase/>

        </>
    );
};

export default Table;
