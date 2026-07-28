import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '@/components/shared/Sidebar'

function page() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
    </Box>
  )
}

export default page
