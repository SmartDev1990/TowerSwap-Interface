import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Button, Flex, Heading, LinkExternal, PageHeader, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { PageMeta } from 'components/Layout/Page'
import Script from 'next/script'

const StyledPageHeader = styled(PageHeader)`
  margin-bottom: -40px;
  padding-bottom: 40px;
  background: white;
`

declare global {
  interface Window {
    renderStats: () => void
  }
}

const Home: React.FC = () => {
  const { t } = useTranslation()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.bandit.network/sdk/index.js'
    script.type = 'module'
    script.onload = () => window.renderStats()

    document.body.appendChild(script)
  }, [])

  return (
    <>
      <PageMeta />
      <StyledPageHeader>
        <div>
          <Heading as="h1" scale="xxl" color="black" mb="24px">
            {t('NFT Marketplace')}
          </Heading>
          <Heading scale="lg" color="black">
            {t('Mint NFTs with TowerSwap')}
          </Heading>
        </div>
        <Box>
          <div data-access-key="def9ad2fe9f541cbae523cfd1a48e391" id="bad-stats"></div>
        </Box>
      </StyledPageHeader>
    </>
  )
}

export default Home
