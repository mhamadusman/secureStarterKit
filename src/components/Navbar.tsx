import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Button, Avatar, IconButton, Divider, CircularProgress } from '@mui/material'
import { Home, AccountCircle, ExitToApp, KeyboardArrowDown } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '../hooks/useCurrentUser.hook'
import { AuthService } from '../Services/authService'
import { handleApiError, handleApiSuccess } from '../utils/apiHandler'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], null)
      queryClient.cancelQueries()
      handleApiSuccess(data?.message)
      navigate('/login', { replace: true })
    },
    onError: (error) => {
      handleApiError(error, undefined, 'Logout failed. Please try again.')
    }
  })

  const handleLogOut = () => {
    setIsOpen(false)
    logoutMutation.mutate()
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(8, 10, 12, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        color: '#FFFFFF',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Pushes brand/links to left, profile to right
          alignItems: 'center',
          px: { xs: 1.5, sm: 3, md: 4 },
          minHeight: { xs: 56, md: 64 },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Side: Brand Logo & Dashboard Nav Link */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
              color: '#00A896',
              letterSpacing: '0.2px',
              cursor: 'pointer',
              fontFamily: '"Poppins", sans-serif',
              whiteSpace: 'nowrap',
            }}
            onClick={() => navigate('/dashboard')}
          >
            SecureStarter
          </Typography>

          <Button
            disableRipple
            startIcon={<Home sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, color: '#FFFFFF' }} />}
            sx={{
              bgcolor: 'transparent',
              color: '#f9fcfe', // Set Dashboard link text to white
              textTransform: 'none',
              fontWeight: 500,
              fontSize: { xs: '0.75rem', md: '0.85rem' },
              px: { xs: 1, md: 1.5 },
              py: 0.5,
              minWidth: 'auto',
              borderRadius: '6px',
              border: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'transparent',
                color: '#00A896',
                boxShadow: 'none',
                '& .MuiSvgIcon-root': {
                  color: '#00A896',
                },
              },
            }}
            onClick={() => navigate('/dashboard')}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Dashboard
            </Box>
          </Button>
        </Box>

        {/* Right Side: Profile Dropdown Trigger */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            disableRipple
            disabled={logoutMutation.isPending}
            sx={{
              p: { xs: 0.1, md: 0.1 },
              gap: 0.25,
              borderRadius: '20px',
              bgcolor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              '&:hover': {
                bgcolor: 'transparent',
                borderColor: '#00A896',
              },
            }}
          >
            <Avatar
              key={user?.profileImage}
              src={user?.profileImage || undefined}
              alt={user?.username || 'User'}
              sx={{
                width: { xs: 18, md: 34 },
                height: { xs: 18, md: 34 },
                border: '1px solid #00A896',
              }}
            />
            <KeyboardArrowDown
              sx={{
                fontSize: { xs: '0.9rem', md: '1.2rem' },
                color: isOpen ? '#00A896' : 'rgba(255, 255, 255, 0.7)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease, color 0.2s ease',
              }}
            />
          </IconButton>

          {/* Background Overlay for Closing Menu */}
          {isOpen && (
            <Box
              onClick={() => setIsOpen(false)}
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9,
                cursor: 'default',
                bgcolor: 'transparent',
              }}
            />
          )}

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '115%',
                  width: { xs: 180, sm: 210 },
                  bgcolor: '#121212',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.8)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  p: { xs: 0.75, md: 1 },
                  zIndex: 10,
                }}
              >
                {/* User Information */}
                <Box sx={{ px: 1, py: 0.75 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: '#FFFFFF',
                      fontSize: { xs: '0.75rem', md: '0.85rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user?.username || 'User'}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: { xs: '0.65rem', md: '0.75rem' },
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user?.email || ''}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {/* Profile Navigation Link */}
                <Button
                  fullWidth
                  disableRipple
                  startIcon={<AccountCircle sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }} />}
                  onClick={() => {
                    setIsOpen(false)
                    navigate('/profile')
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    bgcolor: 'transparent',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textTransform: 'none',
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    py: 0.75,
                    px: 1,
                    borderRadius: '6px',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#00A896',
                      boxShadow: 'none',
                      '& .MuiSvgIcon-root': {
                        color: '#00A896',
                      },
                    },
                  }}
                >
                  Profile
                </Button>

                {/* Logout Action */}
                <Button
                  fullWidth
                  disableRipple
                  disabled={logoutMutation.isPending}
                  startIcon={
                    logoutMutation.isPending ? (
                      <CircularProgress size={14} sx={{ color: '#00A896' }} />
                    ) : (
                      <ExitToApp sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }} />
                    )
                  }
                  onClick={handleLogOut}
                  sx={{
                    justifyContent: 'flex-start',
                    bgcolor: 'transparent',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textTransform: 'none',
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    py: 0.75,
                    px: 1,
                    borderRadius: '6px',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: '#F44336',
                      boxShadow: 'none',
                      '& .MuiSvgIcon-root': {
                        color: '#F44336',
                      },
                    },
                  }}
                >
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </Button>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Toolbar>
    </AppBar>
  )
}