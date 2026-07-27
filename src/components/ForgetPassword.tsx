import { Box, Button, TextField, Typography, Link, Card } from '@mui/material'
import { useForm } from 'react-hook-form'
import LoadingIndicator from './LoadingIndicator'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../Services/authService'
import { handleApiError, handleApiSuccess } from '../utils/apiHandler'

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      const resp = await AuthService.forgetPassword(data)
      handleApiSuccess(resp.message)
    } catch (error) {
      handleApiError(error, undefined, 'Failed to send reset link. Please try again.')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        p: 2,
        boxSizing: 'border-box',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 960,
          height: 580,
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 0.85,
            position: 'relative',
            backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 5,
            clipPath: 'polygon(0% 0%, 100% 0%, 91% 100%, 0% 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
            },
          }}
        >
          <Typography variant="h6" sx={{ color: '#FFFFFF', zIndex: 1, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            Secure Starter Kit
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', zIndex: 1, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            Authentication & Security UI
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 4, md: 5 },
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 360 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 0.5 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2.5, fontSize: '0.85rem' }}>
              Enter your registered email address to receive a password reset link.
            </Typography>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              margin="dense"
              {...register('email')}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'primary.main',
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                height: 40,
                mb: 2.5,
                fontSize: '0.85rem'
              }}
            >
              {isSubmitting ? <LoadingIndicator /> : 'Send Reset Link'}
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
              Remembered your password?{' '}
              <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer', textDecoration: 'none', fontWeight: 600 }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}