import React from 'react'
import Alert from '@mui/material/Alert';

function ErrorAlert({message}) {
  return (
    <>
    {message && <Alert severity="error" className='z-50 fixed right-3 bottom-3'>{message}</Alert>}
    </>
  )
}

export default ErrorAlert