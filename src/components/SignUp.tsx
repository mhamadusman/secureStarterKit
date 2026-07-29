import { useState, useEffect } from 'react'
import { Box, Button, TextField, Typography, Link, Divider, Card, InputAdornment, IconButton, SvgIcon } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff, Check, Close } from '@mui/icons-material'
import LoadingIndicator from '../components/LoadingIndicator'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { handleApiError, handleApiSuccess } from '../utils/apiHandler'
import { authService } from '../Services/authService'

// Custom circular icon components matching social design reference
const GoogleIconCircle = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="1.5" />
    <path d="M12 11h4.6a4.8 4.8 0 1 1-1.4-3.4L13.8 9a2.8 2.8 0 1 0-.7 4.5h-1.1V11Z" fill="currentColor" />
  </SvgIcon>
)

const GitHubIconCircle = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="1.5" />
    <path d="M12 4a8 8 0 0 0-2.53 15.59c.4.08.54-.18.54-.38l-.01-1.36c-2.22.48-2.69-1.07-2.69-1.07-.36-.93-.89-1.18-.89-1.18-.72-.5.06-.48.06-.48.8.06 1.22.82 1.22.82.72 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.94.29.25.54.74.54 1.48l-.01 2.2c0 .21.14.47.55.38A8 8 0 0 0 12 4Z" fill="currentColor" />
  </SvgIcon>
)

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const taglines = [
  "Capture your personal memories in a unique way, anywhere.",
  "Secure your application with our authentication kit.",
  "You can start up with our website seamlessly."
]

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
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

  const passwordValue = watch('password') || ''

  // Password Requirement Checks
  const hasMinLength = passwordValue.length >= 8
  const hasUppercase = /[A-Z]/.test(passwordValue)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)

  // Automatic Text Rotation Interval (changes every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % taglines.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

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

  // Dark input styling with 4px border radius
  const inputStyles = {
    mb: 1.1,
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
      py: 1.1,
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

  // Circular social button styles
  const socialButtonStyles = {
    minWidth: '42px',
    width: '42px',
    height: '42px',
    p: 0,
    borderRadius: '50%',
    color: '#FFFFFF',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    bgcolor: 'transparent',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      bgcolor: '#FFFFFF',
      color: '#000000',
      borderColor: '#FFFFFF',
      boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.35rem',
    },
  }

  const isLoading = isSubmitting || signUpMutation.isPending

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        maxHeight: '100vh',
        width: '100vw',
        overflow: 'hidden', // Prevents layout scrollbars
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
          height: { xs: 'auto', md: 580 }, // Matches Login card dimensions
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
              Keep it Simple
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
                mb: 1.5,
                fontWeight: 700,
                color: '#FFFFFF',
                fontFamily: '"Poppins", sans-serif',
                fontSize: { xs: '1.65rem', md: '2rem' },
              }}
            >
              SIGN UP
            </Typography>

            {/* Circular Social Authentication Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
              <Button
                variant="outlined"
                onClick={authService.loginWithGoogle}
                sx={socialButtonStyles}
                aria-label="Login with Google"
              >
                <GoogleIconCircle />
              </Button>
              <Button
                variant="outlined"
                onClick={authService.loginWithGithub}
                sx={socialButtonStyles}
                aria-label="Login with GitHub"
              >
                <GitHubIconCircle />
              </Button>
            </Box>

            <Divider sx={{ my: 1.2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
              or use your email account
            </Divider>

            {/* Name Input */}
            <TextField
              fullWidth
              label={errors.name?.message || 'Full Name'}
              variant="outlined"
              size="small"
              error={!!errors.name}
              {...register('name', { required: 'Name is required' })}
              sx={inputStyles}
            />

            {/* Email Input */}
            <TextField
              fullWidth
              label={errors.email?.message || 'Email'}
              variant="outlined"
              size="small"
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

            {/* Password Input */}
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label={errors.password?.message || 'Password'}
              variant="outlined"
              size="small"
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
                        sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                      >
                        {showPassword ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ ...inputStyles, mb: passwordValue.length > 0 ? 0.5 : 1.1 }}
            />

            {/* Password Criteria Feedback */}
            {passwordValue.length > 0 && (
              <Box sx={{ mb: 1, pl: 0.5 }}>
                <RequirementItem label="8+ characters" isMet={hasMinLength} />
                <RequirementItem label="1 uppercase letter" isMet={hasUppercase} />
                <RequirementItem label="1 special character" isMet={hasSpecialChar} />
              </Box>
            )}

            {/* Confirm Password Input */}
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              label={errors.confirmPassword?.message || 'Confirm Password'}
              variant="outlined"
              size="small"
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
                        sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                      >
                        {showConfirmPassword ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputStyles}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                height: 42,
                mt: 0.5,
                mb: 1.5,
                borderRadius: '4px', // Simple rectangle button matching Login
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
              {isLoading ? <LoadingIndicator /> : 'SIGN UP'}
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Already have an account?{' '}
              <Link
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer', color: '#00A896', textDecoration: 'none', fontWeight: 600 }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

// Requirement Item Helper Component
function RequirementItem({ label, isMet }: { label: string; isMet: boolean }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, my: 0.1 }}>
      {isMet ? (
        <Check sx={{ fontSize: '0.8rem', color: '#4CAF50' }} />
      ) : (
        <Close sx={{ fontSize: '0.8rem', color: '#F44336' }} />
      )}
      <Typography variant="caption" sx={{ color: isMet ? '#4CAF50' : '#F44336', fontSize: '0.68rem' }}>
        {label}
      </Typography>
    </Box>
  )
}