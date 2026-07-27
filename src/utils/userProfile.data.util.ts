import Profile from '../components/Profile';
export interface CleanedUserData {
  username: string
  email: string
  isEmailVerified: boolean
  provider: string
  createdAt: string
  updatedAt: string
  profileImage: string
}

export const mapUserData = (rawData: any): CleanedUserData => {
  const accounts = rawData?.accounts || []
  const activeAccount = accounts[0] || {}
  console.log(rawData)

  return {
    username: rawData?.name || 'User',
    email: rawData?.email || '',
    isEmailVerified: Boolean(rawData?.isEmailVerified),
    provider: activeAccount?.provider
      ? activeAccount.provider.charAt(0).toUpperCase() + activeAccount.provider.slice(1)
      : 'Local',
    createdAt: rawData?.createdAt
      ? new Date(rawData.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    updatedAt: rawData?.updatedAt
      ? new Date(rawData.updatedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    profileImage: rawData?.profileImage ||'',
  }
}