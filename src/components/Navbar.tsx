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
        // Glassy Frosted Navbar Effect
        bgcolor: 'rgba(8, 10, 12, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        color: '#FFFFFF',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: 64 }}>

        {/* Left Side: Logo & Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#00A896',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              fontFamily: '"Poppins", sans-serif',
            }}
            onClick={() => navigate('/dashboard')}
          >
            SecureStarter
          </Typography>

          <Button
            startIcon={<Home sx={{ fontSize: '1.2rem', color: '#00A896' }} />}
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              px: 1.5,
              py: 0.75,
              borderRadius: '6px',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                color: '#00A896',
              }
            }}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </Box>

        {/* Right Side: Circular Profile & Dropdown Wrapper */}
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            disableRipple
            disabled={logoutMutation.isPending}
            sx={{
              p: 0.5,
              gap: 0.5,
              borderRadius: '20px',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <Avatar
              key={user?.profileImage}
              src={user?.profileImage || undefined}
              alt={user?.username || 'User'}
              sx={{ width: 34, height: 34, border: '1px solid #00A896' }}
            />
            <KeyboardArrowDown
              sx={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.7)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            />
          </IconButton>

          {/* Simple Full-Screen Clickable Overlay */}
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

          {/* Smooth Dropdown Menu */}
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
                  top: '120%',
                  width: 210,
                  bgcolor: '#121212',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.8)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  p: 1,
                  zIndex: 10
                }}
              >
                <Box sx={{ px: 1.5, py: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                    {user?.username || 'Jane Doe'}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {user?.email || 'jane.doe@uisocial.com'}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {/* Profile Button */}
                <Button
                  fullWidth
                  startIcon={<AccountCircle sx={{ fontSize: '1.2rem', color: '#00A896' }} />}
                  onClick={() => { setIsOpen(false); navigate('/profile'); }}
                  sx={{
                    justify: 'flex-start',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    py: 1,
                    px: 1.5,
                    borderRadius: '6px',
                    '&:hover': {
                      bgcolor: 'rgba(0, 168, 150, 0.12)',
                      color: '#00A896'
                    }
                  }}
                >
                  Profile
                </Button>

                {/* Logout Button */}
                <Button
                  fullWidth
                  disabled={logoutMutation.isPending}
                  startIcon={
                    logoutMutation.isPending ? (
                      <CircularProgress size={16} sx={{ color: '#00A896' }} />
                    ) : (
                      <ExitToApp sx={{ fontSize: '1.2rem', color: '#F44336' }} />
                    )
                  }
                  onClick={handleLogOut}
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    py: 1,
                    px: 1.5,
                    borderRadius: '6px',
                    '&:hover': {
                      bgcolor: 'rgba(244, 67, 54, 0.12)',
                      color: '#F44336'
                    }
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