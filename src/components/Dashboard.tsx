import { Box, Card, Typography, Avatar, Grid, Chip, Divider } from '@mui/material'
import { AccountCircle, Email, Security, CalendarToday, Update, Hub } from '@mui/icons-material'

export default function Dashboard() {
  const user = {
    username: 'Jane Doe',
    email: 'jane.doe@uisocial.com',
    isEmailVerified: true,
    provider: 'Google',
    createdAt: 'July 15, 2026',
    updatedAt: 'July 20, 2026',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
  }

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: 'background.default',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centers everything vertically for a cleaner, compact layout
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 840 }}> {/* Wraps form area to tightly restrict max expansion width */}
        {/* Welcome Header */}
        <Box sx={{ mb: 3, px: 0.5 }}>
          <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
            Welcome Back, {user.username.split(' ')[0]}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account profile and security settings below.
          </Typography>
        </Box>

        {/* Grid Container */}
        <Grid container spacing={3}>
          
          {/* Left Card: Profile Overview */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3, // Shrunk internal card padding from 4 to 3
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              <Avatar
                src={user.profileImage}
                alt={user.username}
                sx={{
                  width: 80, // Shrunk dimension size from 100 to 80
                  height: 80,
                  mb: 2,
                  border: '3px solid',
                  borderColor: 'primary.light',
                  boxShadow: '0 4px 14px rgba(234, 67, 53, 0.15)',
                }}
              />
              
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                {user.username}
              </Typography>

              <Chip
                label={user.isEmailVerified ? 'Verified Account' : 'Unverified Account'}
                size="small"
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.7rem', 
                  mb: 2.5,
                  borderRadius: 1.5,
                  ...(user.isEmailVerified 
                    ? { bgcolor: 'rgba(46, 125, 50, 0.1)', color: '#1b5e20' }
                    : { bgcolor: 'rgba(237, 108, 2, 0.1)', color: '#e65100' }
                  )
                }}
              />

              <Divider sx={{ width: '100%', mb: 2 }} />

              {/* Account Information Details */}
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <AccountCircle sx={{ color: 'text.secondary', fontSize: '1.15rem' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      Full Name
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      {user.username}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Email sx={{ color: 'text.secondary', fontSize: '1.15rem' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      Email Address
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Right Card: Security & Metadata */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: 3, // Shrunk internal card padding from 4 to 3
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 0.25, fontWeight: 600 }}>
                Security & Meta Details
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2.5 }}>
                System data logs related to your identity token generation.
              </Typography>

              <Divider sx={{ width: '100%', mb: 2 }} />

              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Identity Provider */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Hub sx={{ color: 'text.secondary', fontSize: '1.15rem' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      Authentication Provider
                    </Typography>
                    <Chip
                      label={user.provider}
                      size="small"
                      sx={{
                        mt: 0.25,
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        height: 20,
                        bgcolor: user.provider === 'Google' ? 'rgba(234, 67, 53, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                        color: user.provider === 'Google' ? 'primary.main' : 'text.primary',
                        border: '1px solid',
                        borderColor: user.provider === 'Google' ? 'primary.light' : 'divider',
                      }}
                    />
                  </Box>
                </Box>

                {/* Account Verification Status */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Security sx={{ color: 'text.secondary', fontSize: '1.15rem' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      Verification Status
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: user.isEmailVerified ? 'success.main' : 'warning.main' }}>
                      {user.isEmailVerified ? 'Email successfully verified' : 'Action Required: Verify Email'}
                    </Typography>
                  </Box>
                </Box>

                {/* Created At Timestamps */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CalendarToday sx={{ color: 'text.secondary', fontSize: '1.15rem' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      Account Created
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      {user.createdAt}
                    </Typography>
                  </Box>
                </Box>

                {/* Updated At Timestamps */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Update sx={{ color: 'text.secondary', fontSize: '1.15rem' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                      Last Profile Update
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      {user.updatedAt}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}