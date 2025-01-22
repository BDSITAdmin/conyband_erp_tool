import React from 'react'
import Alert from '@mui/material/Alert';

function SuccessAlert({message}) {
  return (
    <>
        {message && <Alert severity="success" className=' fixed right-3 bg-red-800 bottom-3'>{message}</Alert>}
    </>
  )
}

export default SuccessAlert