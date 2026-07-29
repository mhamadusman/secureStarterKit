import { useState, useEffect } from 'react'
import { Box, Button, TextField, Typography, Link, Card } from '@mui/material'
import { useForm } from 'react-hook-form'
import LoadingIndicator from '../components/LoadingIndicator'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthService } from '../Services/authService'
import { handleApiError, handleApiSuccess } from '../utils/apiHandler'

const taglines = [
  "Capture your personal memories in a unique way, anywhere.",
  "Secure your application with our authentication kit.",
  "You can start up with our website seamlessly."
]

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const [textIndex, setTextIndex] = useState(0)
  const navigate = useNavigate()

  // Automatic Hero Text Rotation Interval (changes every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % taglines.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const onSubmit = async (data: any) => {
    try {
      const resp = await AuthService.forgetPassword(data)
      handleApiSuccess(resp.message)
    } catch (error) {
      handleApiError(error, undefined, 'Failed to send reset link. Please try again.')
    }
  }

  // Dark input styling with 4px border radius
  const inputStyles = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#000000',
      borderRadius: '4px',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
      },
      '&:hover fieldset': {
        borderColor: '#FFFFFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00A896',
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '0.75rem',
      py: 1.2,
      color: '#FFFFFF',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#00A896',
    },
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        overflow: 'hidden', // Prevents layout scrollbars completely
        bgcolor: '#080a0c',
        background: {
          xs: '#080a0c',
          md: 'radial-gradient(circle at 50% 50%, #1a2529 0%, #080a0c 100%)',
        },
        p: { xs: 2, md: 2 },
        boxSizing: 'border-box',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: { xs: 380, md: 960 },
          height: { xs: 'auto', md: 580 }, // Exact matching height with Login/SignUp
          borderRadius: { xs: 0, md: '24px' },
          bgcolor: { xs: 'transparent', md: '#121212' },
          backgroundImage: 'none',
          boxShadow: { xs: 'none', md: '0px 20px 60px rgba(0, 0, 0, 0.8)' },
          overflow: 'hidden',
          p: 0,
        }}
      >
        {/* Left Side Image Container (Visible on Desktop) */}
        <Box
          sx={{
            flex: 0.85,
            position: 'relative',
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 4,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            },
          }}
        >
          {/* Brand Title */}
          <Typography
            variant="h5"
            sx={{
              color: '#FFFFFF',
              zIndex: 1,
              fontWeight: 700,
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Secure Starter Kit
          </Typography>

          {/* Automatic Animated Purpose Message */}
          <Box sx={{ zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                mb: 1.5,
                lineHeight: 1.2,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Reset Access
            </Typography>
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '0.95rem',
                    maxWidth: 320,
                  }}
                >
                  {taglines[textIndex]}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          <Typography
            variant="caption"
            sx={{ color: 'rgba(255, 255, 255, 0.4)', zIndex: 1 }}
          >
            Powered by Secure Starter Kit
          </Typography>
        </Box>

        {/* Right Form Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 2, md: 4 },
            bgcolor: { xs: 'transparent', md: '#121212' },
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 360 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                mb: 1,
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: '1.65rem', md: '2rem' },
              }}
            >
              Forgot Password
            </Typography>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontSize: '0.8rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.4,
              }}
            >
              Enter your registered email address to receive a password reset link.
            </Typography>

            {/* Email Input */}
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              {...register('email')}
              sx={inputStyles}
            />

            {/* Rectangular Action Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                height: 42,
                mb: 2,
                borderRadius: '4px', // Simple rectangle button shape
                backgroundColor: '#00A896',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#008E7E',
                  boxShadow: 'none',
                },
              }}
            >
              {isSubmitting ? <LoadingIndicator /> : 'SEND RESET LINK'}
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Remembered your password?{' '}
              <Link
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer', color: '#00A896', textDecoration: 'none', fontWeight: 600 }}
              >
                LOG IN
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}