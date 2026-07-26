import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import LoadingIndicator from './LoadingIndicator'
import { handleApiError } from '../utils/apiHandler'
import { useCurrentUser } from '../hooks/useCurrentUser.hook'

export default function AuthenticatedLayout() {
  const { data: user, isLoading, isError, error } = useCurrentUser()
  useEffect(() => {
    if (isError && error) {
      handleApiError(error, undefined, 'Session expired. Please log in again.')
    }
  }, [isError, error])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <LoadingIndicator />
      </Box>
    )
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  )
}