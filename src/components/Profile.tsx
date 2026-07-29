import { Box, Card, Typography, Avatar, Divider } from '@mui/material'
import { AccountCircle, Email, Shield, Badge, CalendarToday } from '@mui/icons-material'
import { useCurrentUser } from '../hooks/useCurrentUser.hook'

export default function Profile() {
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  const detailItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: 1.5,
    borderRadius: '6px',
    bgcolor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#080a0c',
        background: {
          xs: '#080a0c',
          md: 'radial-gradient(circle at 50% 50%, #1a2529 0%, #080a0c 100%)',
        },
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        {/* Header Title */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              mb: 0.5,
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            My Profile
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
            Your secure account identity information.
          </Typography>
        </Box>

        {/* Profile Card Container */}
        <Card
          sx={{
            p: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            bgcolor: { xs: 'transparent', md: '#121212' },
            backgroundImage: 'none',
            borderRadius: { xs: 0, md: '16px' },
            border: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.1)' },
            boxShadow: { xs: 'none', md: '0px 10px 40px rgba(0, 0, 0, 0.6)' },
          }}
        >
          {/* Circular Avatar */}
          <Avatar
            key={user.profileImage}
            src={user.profileImage}
            alt={user.username}
            sx={{
              width: 88,
              height: 88,
              mb: 2,
              border: '3px solid #00A896',
              boxShadow: '0 4px 20px rgba(0, 168, 150, 0.25)',
            }}
          />

          <Typography
            variant="h6"
            sx={{
              mb: 0.5,
              fontWeight: 600,
              color: '#FFFFFF',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {user.username}
          </Typography>

          <Divider sx={{ width: '100%', my: 2.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Identity Information List */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Full Name */}
            <Box sx={detailItemStyles}>
              <AccountCircle sx={{ color: '#00A896', fontSize: '1.2rem' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', lineHeight: 1.2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}
                >
                  Full Name
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#FFFFFF' }}>
                  {user.username}
                </Typography>
              </Box>
            </Box>

            {/* Email Address */}
            <Box sx={detailItemStyles}>
              <Email sx={{ color: '#00A896', fontSize: '1.2rem' }} />
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', lineHeight: 1.2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}
                >
                  Email Address
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                    wordBreak: 'break-word',
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>

            {/* Verification Status */}
            <Box sx={detailItemStyles}>
              <Shield sx={{ color: user.isEmailVerified ? '#00A896' : '#FFA726', fontSize: '1.2rem' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', lineHeight: 1.2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}
                >
                  Verification Status
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: user.isEmailVerified ? '#00A896' : '#FFA726',
                  }}
                >
                  {user.isEmailVerified ? 'Verified Account' : 'Unverified Account'}
                </Typography>
              </Box>
            </Box>

            {/* Account Provider */}
            <Box sx={detailItemStyles}>
              <Badge sx={{ color: '#00A896', fontSize: '1.2rem' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', lineHeight: 1.2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}
                >
                  Account Level
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#FFFFFF', textTransform: 'capitalize' }}
                >
                  {user.provider}
                </Typography>
              </Box>
            </Box>

            {/* Member Since */}
            <Box sx={detailItemStyles}>
              <CalendarToday sx={{ color: '#00A896', fontSize: '1.2rem' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', lineHeight: 1.2, color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.7rem' }}
                >
                  Member Since
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#FFFFFF' }}>
                  {user.createdAt}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}