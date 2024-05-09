import { ChainId } from '@pancakeswap/sdk'
import ethereumImage from './images/1.png'
import rinkebyImage from './images/4.png'
import goerlyImage from './images/5.png'
import bscImage from './images/56.png'
import bsctestnetImage from './images/97.png'
import cmpImage from './images/256256.png'
import zetaImage from './images/Zeta.png'
import shardeumImage from './images/8453.png'
import shardeumvalidatorImage from './images/8082.png'
import quaiImage from './images/9000.png'

interface CurrencyLogoProps {
  chainId: number
  style?: React.CSSProperties // Add this line
}

const Ethereum: React.FC = () => <img src={ethereumImage.src} alt="Ethereum" />
const Rinkeby: React.FC = () => <img src={rinkebyImage.src} alt="Rinkeby" />
const Goerly: React.FC = () => <img src={goerlyImage.src} alt="Goerly" />
const Bsc: React.FC = () => <img src={bscImage.src} alt="Bsc" />
const Bsctestnet: React.FC = () => <img src={bsctestnetImage.src} alt="Bsctestnet" />
const Cmp: React.FC = () => <img src={cmpImage.src} alt="Cmp" />
const Zeta: React.FC = () => <img src={zetaImage.src} alt="Zeta" />
const ZetaMainnet: React.FC = () => <img src={zetaImage.src} alt="ZetaMainnet" />
const Shardeum: React.FC = () => <img src={shardeumImage.src} alt="Shardeum" />
const Shardeumvalidator: React.FC = () => <img src={shardeumvalidatorImage.src} alt="Shardeumvalidator" />
const Quai: React.FC = () => <img src={quaiImage.src} alt="Quai" />

const CurrencyLogo: React.FC<CurrencyLogoProps> = ({ chainId, style }) => {
  let logoComponent

  switch (chainId) {
    case ChainId.ETHEREUM:
      logoComponent = <Ethereum />
      break
    case ChainId.RINKEBY:
      logoComponent = <Rinkeby />
      break
    case ChainId.GOERLI:
      logoComponent = <Goerly />
      break
    case ChainId.BSC:
      logoComponent = <Bsc />
      break
    case ChainId.BSC_TESTNET:
      logoComponent = <Bsctestnet />
      break
    case ChainId.CMP:
      logoComponent = <Cmp />
      break
    case ChainId.ZETA_TESTNET:
      logoComponent = <Zeta />
      break
    case ChainId.ZETA:
      logoComponent = <ZetaMainnet />
      break
    case ChainId.BASE:
      logoComponent = <Ethereum />
      break
    case ChainId.SHARDEUMV:
      logoComponent = <Shardeumvalidator />
      break
    case ChainId.QUAI:
      logoComponent = <Quai />
      break
    default:
      logoComponent = null
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: '90px',
        width: '30px',
        height: '30px',
        ...style,
      }}
    >
      {logoComponent}
    </div>
  )
}

export default CurrencyLogo
