import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import TableComponent from '../components/TableComponent';
import AddCategoryForm from '../components/AddOrderForm'


function OrderConfiguration() {

    const { data: rows, loading, error, reFetch: reFetchTableData } = useFetch();


    useEffect(() => {
        reFetchTableData()
    }, [])

    return (
        <>
            {/* navigation  */}
            <div className="w-full p-6 bg-gray-100 rounded-md">
                <h1 className="mb-4 text-2xl font-semibold">Order Configuration</h1>
                
                {rows.length > 1 ?
                    <TableComponent columns={columns} rows={rows} /> :
                    <h2 className='m-4' >No Data Found</h2>
                }
                
            </div>
            <div className="flex justify-end">
                <AddCategoryForm />
            </div>
            
        </>
    )
}

export default OrderConfiguration
