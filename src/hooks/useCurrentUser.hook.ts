import { useQuery } from '@tanstack/react-query'
import { AuthService } from '../Services/authService'
import { mapUserData } from '../utils/userProfile.data.util'

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: AuthService.getCurrentUser,
    retry: false,
    select: mapUserData,
    staleTime: 1000 * 60 * 5, 
  })
}