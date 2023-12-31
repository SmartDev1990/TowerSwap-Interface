import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import PublicCard from './PublicSale'
import FairCard from './FairSale'
import PrivateCard from './PrivateSale'
import { Image, Flex, Heading, Button, Box, Farm as FarmUI, LaunchpadHeader } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'

interface LaunchpadInfo {
  factoryContractAddress: string
  saleType: string
}

const FarmFlexWrapper = styled(Flex)`
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: nowrap;
  }
`
const FarmH1 = styled(Heading)`
  font-size: 25px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 36px;
    margin-bottom: 24px;
  }
`

const LaunchpadList = (props: LaunchpadInfo) => {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div className="launchpad-container">
      <LaunchpadHeader borderRadius="10px" marginBottom="20px">
        <FarmFlexWrapper justifyContent="space-between">
          <Box>
            <FarmH1 as="h1" color="black">
              {t('Tower Launchpad')}
            </FarmH1>
            <Button padding="15px" color="black">
              {t('Launch Your Sales')}
            </Button>
          </Box>
        </FarmFlexWrapper>
      </LaunchpadHeader>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
        <Tabs style={{ color: 'white' }} value={activeTab} onChange={handleChange} indicatorColor="primary">
          <Tab label="Private Sale" style={{ color: 'white' }} />
          <Tab label="Public Sale" style={{ color: 'white' }} />
          <Tab label="Fair Launch" style={{ color: 'white' }} />
        </Tabs>
      </div>
      <div className="launchpad-card-container">
        {activeTab === 0 && (
          <PrivateCard factoryContractAddress="0xc56126DBA5668bED9302f6EBd579D425C4df7Ae4" saleType="privatesale" />
        )}
        {activeTab === 1 && (
          <PublicCard factoryContractAddress="0x870BA99649C234535c36756F0E85789B43dA4526" saleType="publicsale" />
        )}
        {activeTab === 2 && (
          <FairCard factoryContractAddress="0x1eDF4D8D93579d63e6Dd34cC4A4E49d54D3ab8e0" saleType="fairlaunch" />
        )}
      </div>
    </div>
  )
}

export default LaunchpadList
