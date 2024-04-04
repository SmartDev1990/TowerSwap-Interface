import { Button, Flex, Heading, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import Image from 'next/legacy/image'
import styled, { keyframes } from 'styled-components'
// import bunnyImage from '../../../../public/images/home/lunar-bunny/hero-blockchain-development.webp'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const BunnyImage = styled(Image)`
  width: 100px; // Adjust the width to your desired size
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
width: 250px;
height: 250px;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [{ src: '', alt: '' }],
}

const Hero = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading scale="xxl" color="#48cdff" mb="24px" mt="30px" textAlign="center">
        {t('TOWERSWAP EXCHANGE')}
      </Heading>
      <Heading scale="md" color="#2b2404" mb="12px" textAlign="center">
        {t(
          'Decentralized Exchange Made For Everybody.',
        )}
      </Heading>
      <Heading scale="md" color="#2b2404" mb="24px" textAlign="center">
        {t(
          'Swap, Farm, Stake, Earn passive income with TowerSwap exchange.',
        )}
      </Heading>
      <Flex>
        {!account && <ConnectWalletButton mr="8px" />}
        <NextLinkFromReactRouter to="/swap">
          <Button variant={!account ? 'primary' : 'primary'} mb="24px">{t('Trade Now')}</Button>
        </NextLinkFromReactRouter>
      </Flex>
    </Flex>
  )

}

export default Hero
