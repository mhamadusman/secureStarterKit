import { Box } from '@mui/material'
import { keyframes } from '@emotion/react'

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export default function LoadingIndicator() {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '3px solid transparent',
        borderTop: '3px solid #df1010',
        animation: `${rotate} 0.8s linear infinite`,
      }}
    />
  )
}