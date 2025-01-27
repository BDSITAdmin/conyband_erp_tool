import React from 'react'
import Alert from '@mui/material/Alert';

function SuccessAlert({message}) {
  return (
    <>
        {message && <Alert severity="success" className='z-50 fixed right-3 bg-red-700 bottom-3'>{message}</Alert>}
    </>
  )
}

export default SuccessAlert