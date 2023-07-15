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

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const { data: tvl } = useSWRImmutable('tvl')
  const { data: txCount } = useSWRImmutable('totalTx30Days')
  const { data: addressCount } = useSWRImmutable('addressCount30Days')
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)
  const tvlString = tvl ? formatLocalisedCompactNumber(tvl) : '-'

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

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
      <Heading textAlign="center" color="black" scale="xl" mb="32px">
        {t('Partner')}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {t('TowerSwap Main Partner')}
      </Text>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('')}
      </Text>

      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
        <PartnerLogo height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
        <PartnerLogo1 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
        <PartnerLogo3 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
        <PartnerLogo4 height="80px" width="180px"/>
        </PartnerCard>
      </Flex>
      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
        <PartnerLogo5 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
        <PartnerLogo6 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
        <PartnerLogo7 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
        <PartnerLogo8 height="80px" width="180px"/>
        </PartnerCard>
      </Flex>
      <Flex flexDirection={['column', null, null, 'row']}>
        <PartnerCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '16px']}>
        <PartnerLogo9 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
        <PartnerLogo10 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
        <PartnerLogo11 height="80px" width="180px"/>
        </PartnerCard>
        <PartnerCard {...StakedCardData} mb="16px">
        <PartnerLogo12 height="80px" width="180px"/>
        </PartnerCard>
      </Flex>
    </Flex>
  )
}

export default Stats
