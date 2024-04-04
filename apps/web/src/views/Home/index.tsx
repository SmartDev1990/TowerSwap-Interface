import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useAccount } from 'wagmi'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'
import Hero from './components/Hero'
import {
  swapSectionData,
  earnSectionData,
  bridgeSectionData,
  moreSectionData,
  launchpadSectionData,
} from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import Partner from './components/Partner'
import SalesSection from './components/SalesSection'
import RoadmapSection from './components/RoadmapSection'
import FaqSection from './components/FaqSection'
// import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import MetricsSection3 from './components/MetricsSection3'
// import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
// import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
// import UserBanner from './components/UserBanner'
import MultipleBanner from './components/Banners/MultipleBanner'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;
  background: rgb(243,252,255);
  background: linear-gradient(27deg, rgba(243,252,255,1) 4%, rgba(255,248,207,0.37316176470588236) 39%, rgba(243,252,255,0.5104166666666667) 68%, rgba(255,255,215,0.5608368347338936) 100%);
  background-size: 100% 100%;
  box-shadow: 2px 2px 5px 2px #3c3a0b;
  border: 2px solid;
  background-repeat: no-repeat;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const { t } = useTranslation()

  return (
    <>
      <PageMeta />
      <style jsx global>{`
        #home-1 .page-bg {
          background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
        }
        [data-theme='dark'] #home-1 .page-bg {
          background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
        }
        #home-2 .page-bg {
          background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%);
        }
        [data-theme='dark'] #home-2 .page-bg {
          background: linear-gradient(180deg, #09070c 22%, #201335 100%);
        }
        #home-3 .page-bg {
          background: linear-gradient(180deg, #6fb6f1 0%, #eaf2f6 100%);
        }
        [data-theme='dark'] #home-3 .page-bg {
          background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
        }
        #home-4 .inner-wedge svg {
          fill: #d8cbed;
        }
        [data-theme='dark'] #home-4 .inner-wedge svg {
          fill: #201335;
        }
      `}</style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        index={2}
        hasCurvedDivider={false}
        borderRadius="20px"
        margin="20px"
      >
        {/* <MultipleBanner /> */}
        <Hero />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="#F3EDC8"
        containerProps={{
          id: 'home-4',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <CakeDataRow />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="#f5eda5"
        containerProps={{
          id: 'home-4',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection3 />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="#F3EDC8"
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background='#f5eda5'
        index={2}
        hasCurvedDivider={false}
      >
        <Partner />
      </PageSection>
      {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background='#F3EDC8'
        index={2}
        hasCurvedDivider={false}
      >
        <RoadmapSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(90deg, rgba(75,7,102,1) 6%, rgba(10,55,85,1) 93%)"
        index={2}
        hasCurvedDivider={false}
      >
        <WinSection />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background='#F3EDC8'
        index={2}
        hasCurvedDivider={false}
      >
        <FaqSection />
      </PageSection> */}
    </>
  )
}

export default Home
