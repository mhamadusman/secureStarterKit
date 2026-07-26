import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Button, Avatar, IconButton, Divider } from '@mui/material'
import { Home, AccountCircle, ExitToApp, KeyboardArrowDown } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../hooks/useCurrentUser.hook'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const {data} = useCurrentUser()
    const handleClose = () => {
        setIsOpen(false)

    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: 64 }}>

                {/* Left Side: Logo & Navigation */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            letterSpacing: '0.5px',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/dashboard')}
                    >
                        SecureStarter
                    </Typography>

                    <Button
                        startIcon={<Home sx={{ fontSize: '1.2rem' }} />}
                        sx={{
                            color: 'text.primary',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            px: 1.5,
                            py: 0.75,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: 'action.hover',
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
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            borderRadius: 3,
                            bgcolor: 'action.hover',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                    >
                        <Avatar
                            src={data?.profileImage}
                            alt="User Profile"
                            sx={{ width: 36, height: 36, border: '1px solid', borderColor: 'divider' }}

                        />
                        <KeyboardArrowDown
                            sx={{
                                fontSize: '1.2rem',
                                color: 'text.secondary',
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        />
                    </IconButton>

                    {/* Simple Full-Screen Clickable Overlay */}
                    {isOpen && (
                        <Box
                            onClick={handleClose}
                            sx={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                zIndex: 9,
                                cursor: 'default',
                                bgcolor: 'transparent', // Keeps it completely invisible
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
                                    width: 200,
                                    bgcolor: 'background.paper',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.05)',
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    overflow: 'hidden',
                                    p: 1,
                                    zIndex: 10 // Placed structurally on top of the fixed backdrop layer
                                }}
                            >
                                <Box sx={{ px: 1.5, py: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}
                                    >Jane Doe</Typography>
                                    <Typography variant="caption" color="text.secondary">jane.doe@uisocial.com</Typography>
                                </Box>

                                <Divider sx={{ my: 0.5 }} />

                                {/* Profile Button */}
                                <Button
                                    fullWidth
                                    startIcon={<AccountCircle sx={{ fontSize: '1.2rem' }} />}
                                    onClick={() => { setIsOpen(false); navigate('/profile'); }}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: 'text.primary',
                                        textTransform: 'none',
                                        fontSize: '0.85rem',
                                        py: 1,
                                        px: 1.5,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: 'rgba(234, 67, 53, 0.04)',
                                            color: 'primary.main'
                                        }

                                    }}

                                >
                                    Profile
                                </Button>

                                {/* Logout Button */}
                                <Button
                                    fullWidth
                                    startIcon={<ExitToApp sx={{ fontSize: '1.2rem' }} />}
                                    onClick={handleClose}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: 'text.primary',
                                        textTransform: 'none',
                                        fontSize: '0.85rem',
                                        py: 1,
                                        px: 1.5,
                                        borderRadius: 2,
                                        '&:hover': {
                                            bgcolor: 'rgba(234, 67, 53, 0.04)',
                                            color: 'primary.main'
                                        }
                                    }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        )}
                    </AnimatePresence>
                </Box>

            </Toolbar>
        </AppBar>
    )
}