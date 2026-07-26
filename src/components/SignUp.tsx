import { useState } from 'react'
import { Box, Button, TextField, Typography, Link, Divider, Card, InputAdornment, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Google, GitHub, Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingIndicator from '../components/LoadingIndicator'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { handleApiError, handleApiSuccess } from '../utils/apiHandler'
import { authService } from '../Services/authService'
interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const passwordValue = watch('password')

  const signUpMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      handleApiSuccess(data?.message)
      navigate('/login')
    },
    onError: (error: unknown) => {
      handleApiError(error, setError)
    },
  })

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(data)
  }

  const inputStyles = {
    mb: 0.25,
    '& .MuiInputBase-input': {
      fontSize: '0.8rem',
      py: 1.25,
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.8rem',
      transform: 'translate(14px, 11px) scale(1)',
    },
    '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'primary.main',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
  }

  const isLoading = isSubmitting || signUpMutation.isPending

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
          p: 2,
          
          overflow: 'hidden',
        }}
      >
        {/* Left Decorative Section */}
        <Box
          sx={{
            flex: 0.85,
            position: 'relative',
          borderTopLeftRadius: 60,
          borderBottomLeftRadius: 60,

            
            backgroundImage:
              'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000")',
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
               borderTopLeftRadius: 60,
          borderBottomLeftRadius: 60,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#FFFFFF', zIndex: 1, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            Secure Starter Kit
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.9)', zIndex: 1, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            Authentication & Security UI
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
            p: { xs: 4, md: 5 },
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 360 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
              Create Account
            </Typography>

            {/* Name Field */}
            <TextField
              fullWidth
              label={errors.name?.message || 'Full Name'}
              variant="outlined"
              size="small"
              margin="dense"
              error={!!errors.name}
              {...register('name', { required: 'Name is required' })}
              sx={inputStyles}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              label={errors.email?.message || 'Email'}
              variant="outlined"
              size="small"
              margin="dense"
              error={!!errors.email}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              sx={inputStyles}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label={errors.password?.message || 'Password'}
              variant="outlined"
              size="small"
              margin="dense"
              error={!!errors.password}
              {...register('password', { required: 'Password is required' })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: 'text.secondary', p: 0.25 }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: '1.1rem' }} />
                        ) : (
                          <Visibility sx={{ fontSize: '1.1rem' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputStyles}
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              label={errors.confirmPassword?.message || 'Confirm Password'}
              variant="outlined"
              size="small"
              margin="dense"
              error={!!errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === passwordValue || 'Passwords do not match',
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: 'text.secondary', p: 0.25 }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff sx={{ fontSize: '1.1rem' }} />
                        ) : (
                          <Visibility sx={{ fontSize: '1.1rem' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                ...inputStyles,
                mb: 1,
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{
                height: 40,
                mb: 1.5,
                mt: 1.5,
                fontSize: '0.85rem',
              }}
            >
              {isLoading ? <LoadingIndicator /> : 'Sign Up'}
            </Button>

            <Divider sx={{ my: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
              or continue with
            </Divider>

            <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={authService.loginWithGoogle}
                startIcon={<Google />}
                sx={{
                  py: 1,
                  fontSize: '0.8rem',
                  color: 'text.primary',
                  '&:hover, &.Mui-focused, &.Mui-focusVisible': {
                    bgcolor: 'rgba(234, 67, 53, 0.04) !important',
                    borderColor: 'primary.light',
                  },
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={authService.loginWithGithub}
                startIcon={<GitHub />}
                sx={{
                  py: 1,
                  fontSize: '0.8rem',
                  color: 'text.primary',
                  '&:hover, &.Mui-focused, &.Mui-focusVisible': {
                    bgcolor: 'rgba(234, 67, 53, 0.04) !important',
                    borderColor: 'primary.light',
                  },
                }}
              >
                GitHub
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', fontSize: '0.8rem' }}
            >
              Already have an account?{' '}
              <Link
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer', textDecoration: 'none', fontWeight: 600 }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}