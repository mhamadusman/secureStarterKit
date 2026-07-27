import { useState } from 'react'
import { Box, Button, TextField, Typography, Link, Divider, Card, InputAdornment, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Google, GitHub, Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingIndicator from '../components/LoadingIndicator'
import { useNavigate } from 'react-router-dom'
import { authService, AuthService } from '../Services/authService'
import { handleApiError } from '../utils/apiHandler'


export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [isGoogleLogin, setGoogleLogin] = useState(false)
  const [isGitHubLogin, setGitHubLogin] = useState(false)
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    try {
      await AuthService.login(data)
      navigate('/dashboard')
    } catch (error) {
      handleApiError(error, undefined, 'Login failed. Please check your credentials.')
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
              Login to your account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2.5 }}>
            </Typography>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              margin="dense"
              {...register('email')}
              sx={{
                mb: 0.5,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'primary.main',
                },
              }}
            />
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              size="small"
              margin="dense"
              {...register('password')}
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
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'primary.main',
                },
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5, mb: 1.5 }}>
              <Link
                onClick={() => navigate('/forget-password')} 
                variant="body2"
                color="primary.main"
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  cursor: 'pointer', fontWeight: 600
                }}
              >
                Forgot password ?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                height: 40,
                mb: 2,
                fontSize: '0.85rem'
              }}
            >
              {isSubmitting ? <LoadingIndicator /> : 'Login'}
            </Button>

            <Divider sx={{ my: 1.5, color: 'text.secondary', fontSize: '0.8rem' }}>
              or continue with
            </Divider>

            <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                disabled={isGoogleLogin}
                onClick={()=>{setGoogleLogin(true), authService.loginWithGoogle()}}
                startIcon={<Google />}
                sx={{
                  py: 1,
                  fontSize: '0.8rem',
                  color: 'text.primary',
                  '&:hover, &.Mui-focused, &.Mui-focusVisible': {
                    bgcolor: 'rgba(234, 67, 53, 0.04) !important',
                    borderColor: 'primary.light'
                  },
                }}
              >
               
                Google
               
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                disabled={isGitHubLogin}
                onClick={()=>{setGitHubLogin(true), authService.loginWithGithub()}}
                startIcon={<GitHub />}
                sx={{
                  py: 1,
                  fontSize: '0.8rem',
                  color: 'text.primary',
                  '&:hover, &.Mui-focused, &.Mui-focusVisible': {
                    bgcolor: 'rgba(234, 67, 53, 0.04) !important',
                    borderColor: 'primary.light'
                  },
                }}
              >
                GitHub
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
              Don't have an account?{' '}
              <Link onClick={() => navigate('/signup')} sx={{ cursor: 'pointer', textDecoration: 'none', fontWeight: 600 }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}