import { Box, Card, Typography, Avatar, Divider } from '@mui/material'
import { AccountCircle, Email, Shield, Badge, CalendarToday } from '@mui/icons-material'
import { useCurrentUser } from '../hooks/useCurrentUser.hook'

export default function Profile() {
  const { data: user } = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        bgcolor: 'background.default',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
            My Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your secure account identity information.
          </Typography>
        </Box>

        <Card
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <Avatar
            key={user.profileImage}
            src={user.profileImage}
            alt={user.username}
            sx={{
              width: 84,
              height: 84,
              mb: 2,
              border: '3px solid',
              borderColor: 'primary.light',
              boxShadow: '0 4px 14px rgba(234, 67, 53, 0.15)',
            }}
          />

          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
            {user.username}
          </Typography>

          <Divider sx={{ width: '100%', mb: 3 }} />

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountCircle sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                  Full Name
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  {user.username}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Email sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                  Email Address
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Shield sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                  Verification Status
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    color: user.isEmailVerified ? 'success.main' : 'warning.main',
                  }}
                >
                  {user.isEmailVerified ? 'Verified Account' : 'Unverified Account'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Badge sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                  Account Level
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                  {user.provider}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CalendarToday sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>
                  Member Since
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
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