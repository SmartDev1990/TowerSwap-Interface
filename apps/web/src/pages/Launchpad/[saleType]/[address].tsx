import { useRouter } from 'next/router'
import LaunchPadDetails from '../../../views/Launchpad/LaunchpPadDetails'

interface DetailLaunchpadProps {
  address: string
  saleType: string
  // Other props...
}

const LaunchpadDetailsPage: React.FC<DetailLaunchpadProps> = () => {
  const router = useRouter()
  const { saleType } = router.query
  const { address } = router.query as { address: string }

  // Ensure saleType and launchpadAddress are present before accessing the page
  if (!saleType || !address) {
    return null
  }

  return <LaunchPadDetails address={address as string} />
}

export default LaunchpadDetailsPage
