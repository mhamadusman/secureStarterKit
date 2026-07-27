import { useState } from 'react'
import { Box, Button, TextField, Typography, Link, Card, InputAdornment, IconButton, Divider } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff, Refresh } from '@mui/icons-material'
import LoadingIndicator from '../components/LoadingIndicator'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../Services/authService'
import { handleApiError, handleApiSuccess } from '../utils/apiHandler'

interface ResetPasswordFormInputs {
  password: string
  confirmPassword: string
}

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormInputs>({
    mode: 'onChange',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const password = watch('password')
  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      await AuthService.resetPassword({
        password: data.password,
      })
      handleApiSuccess('Password reset successfully! Redirecting to login...')
      navigate('/login')
    } catch (error) {
      handleApiError<ResetPasswordFormInputs>(
        error,
        setError,
        'Failed to reset password. Please try again.'
      )
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
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2.5, fontSize: '0.85rem' }}>
              Please enter your new password below.
            </Typography>

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              variant="outlined"
              size="small"
              margin="dense"
              error={!!errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Must be at least 8 characters long',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: 'Must contain uppercase, lowercase, number, and special character (@$!%*?&)',
                },
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 0.5,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: errors.password ? 'error.main' : 'primary.main',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: errors.password ? 'error.main' : 'primary.main',
                },
              }}
            />

            {errors.password?.message && (
              <Box sx={{ mb: 1, px: 0.5 }}>
                <Typography
                  variant="caption"
                  color="error.main"
                  sx={{ display: 'block', fontSize: '0.75rem', lineHeight: 1.3 }}
                >
                  • {errors.password.message}
                </Typography>
              </Box>
            )}

            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm New Password"
              variant="outlined"
              size="small"
              margin="dense"
              error={!!errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 0.5,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: errors.confirmPassword ? 'error.main' : 'primary.main',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: errors.confirmPassword ? 'error.main' : 'primary.main',
                },
              }}
            />

            {errors.confirmPassword?.message && (
              <Box sx={{ mb: 1, px: 0.5 }}>
                <Typography
                  variant="caption"
                  color="error.main"
                  sx={{ display: 'block', fontSize: '0.75rem', lineHeight: 1.3 }}
                >
                  • {errors.confirmPassword.message}
                </Typography>
              </Box>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                height: 40,
                mt: 1.5,
                mb: 1.5,
                fontSize: '0.85rem',
              }}
            >
              {isSubmitting ? <LoadingIndicator /> : 'Set New Password'}
            </Button>

            <Divider sx={{ my: 1.5, color: 'text.secondary', fontSize: '0.75rem' }}>
              Expired or missing link?
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => navigate('/forget-password')}
              startIcon={<Refresh />}
              sx={{
                py: 0.8,
                mb: 2,
                fontSize: '0.8rem',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
            >
              Request New Reset Link
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
              Back to{' '}
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