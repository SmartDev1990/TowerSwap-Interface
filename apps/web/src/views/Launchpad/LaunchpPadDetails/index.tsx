// src\views\Launchpad\LaunchpPadDetails\index.tsx
import { useRouter } from 'next/router'
import PrivateDetail from './PrivateDetail'
import PublicDetail from './PublicDetails'
import FairDetail from './FairDetail'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface LaunchpadInfo {
  address: string
}

const LaunchpadDetail: React.FC<LaunchpadInfo> = ({}) => {
  const router = useRouter()
  const { chainId } = useActiveChainId()
  const { saleType } = router.query
  const { address } = router.query as { address: string }

  switch (saleType) {
    case 'privatesale':
      return <PrivateDetail address={address} chainId={chainId.toString()} />
    case 'publicsale':
      return <PublicDetail address={address} chainId={chainId.toString()} />
    case 'fairlaunch':
      return <FairDetail address={address} chainId={chainId.toString()} />
    default:
      return <p>Invalid sale type</p>
  }
}

export default LaunchpadDetail
