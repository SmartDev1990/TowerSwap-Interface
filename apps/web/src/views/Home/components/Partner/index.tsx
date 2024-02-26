import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import PartnerCard, { PartnerCardData } from './PartnerCard'
import StatCardContent from './StatCardContent'
import PartnerLogo from './Partner1'
import PartnerLogo1 from './Partner2'
import PartnerLogo3 from './Partner3'
import PartnerLogo4 from './Partner4'
import PartnerLogo5 from './Partner5'
import PartnerLogo6 from './Partner6'
import PartnerLogo7 from './Partner7'
import PartnerLogo8 from './Partner8'
import PartnerLogo9 from './Partner9'
import PartnerLogo10 from './Partner10'
import PartnerLogo11 from './Partner11'
import PartnerLogo12 from './Partner12'
import PartnerLogo13 from './Partner13'
import PartnerLogo14 from './Partner14'
import PartnerLogo15 from './Partner15'
import PartnerLogo16 from './Partner16'
import PartnerLogo17 from './Partner17'
import PartnerLogo18 from './Partner18'
import PartnerLogo19 from './Partner19'
import PartnerLogo20 from './Partner20'

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const UsersCardData: PartnerCardData = {
    icon: <CommunityIcon color="secondary" width="0px" />,
  }

  const TradesCardData: PartnerCardData = {
    icon: <SwapIcon color="primary" width="0px" />,
  }

  const StakedCardData: PartnerCardData = {
    icon: <ChartIcon color="failure" width="0px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading textAlign="center" color="#353547" scale="xl" mb="32px">
        {t('PARTNER')}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {t('TowerSwap Main Partner')}
      </Text>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('')}
      </Text>

      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
          <PartnerLogo height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo1 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo3 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
          <PartnerLogo15 height="40px" width="180px" />
        </PartnerCard>
      </Flex>
      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
          <PartnerLogo5 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo6 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo7 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
          <PartnerLogo8 height="40px" width="180px" />
        </PartnerCard>
      </Flex>
      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
          <PartnerLogo9 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo10 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo11 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
          <PartnerLogo12 height="40px" width="180px" />
        </PartnerCard>
      </Flex>
      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
          <PartnerLogo13 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo14 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo4 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
          <PartnerLogo16 height="40px" width="180px" />
        </PartnerCard>
      </Flex>
      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
          <PartnerLogo17 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo18 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <PartnerLogo19 height="40px" width="180px" />
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
          <PartnerLogo20 height="40px" width="180px" />
        </PartnerCard>
      </Flex>
    </Flex>
  )
}

export default Stats
