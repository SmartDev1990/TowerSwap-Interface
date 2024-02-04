import {
  ChartDisableIcon,
  ChartIcon,
  Flex,
  HistoryIcon,
  HotIcon,
  HotDisableIcon,
  IconButton,
  NotificationDot,
  Swap,
  useTooltip,
  HelpIcon,
  Text,
  Button,
  useModal,
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import RefreshIcon from 'components/Svg/RefreshIcon'
import { useSwapHotTokenDisplay } from 'hooks/useSwapHotTokenDisplay'
import { ReactElement, useCallback, useContext } from 'react'
import { useExpertModeManager } from 'state/user/hooks'
import styled from 'styled-components'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'
import { SwapFeaturesContext } from '../SwapFeaturesContext'

interface Props {
  title: string | ReactElement
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
}

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = ({
  subtitle,
  hasAmount,
  onRefreshPrice,
  title,
}) => {
  const { isChartSupported, isChartDisplayed, setIsChartDisplayed } = useContext(SwapFeaturesContext)
  const [expertMode] = useExpertModeManager()
  const toggleChartDisplayed = () => {
    setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const handleOnClick = useCallback(() => onRefreshPrice?.(), [onRefreshPrice])
  const [isSwapHotTokenDisplay, setIsSwapHotTokenDisplay] = useSwapHotTokenDisplay()

  // Tooltips
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text>
        {t('To avoid error, First select the two tokens you want to exchange before entering the amount of tokens')}
      </Text>
    </>,
    { placement: 'bottom' },
  )

  return (
    <Swap.CurrencyInputHeader
      title={
        <Flex width="100%" alignItems="center" justifyContent="space-between" flexDirection="column">
          <Flex flexDirection="column" alignItems="center" width="100%" marginBottom={0}>
            <Swap.CurrencyInputHeaderTitle>{title}</Swap.CurrencyInputHeaderTitle>
          </Flex>
          <Flex justifyContent="start" width="100%" height="17px" alignItems="center" mb="14px" marginBottom={0}>
            <Swap.CurrencyInputHeaderSubTitle>{subtitle}</Swap.CurrencyInputHeaderSubTitle>
          </Flex>
          <Flex width="100%" justifyContent="center">
            {isChartSupported && setIsChartDisplayed && (
              <ColoredIconButton
                onClick={() => {
                  if (!isChartDisplayed && isSwapHotTokenDisplay) {
                    setIsSwapHotTokenDisplay(false)
                  }
                  toggleChartDisplayed()
                }}
                variant="text"
                scale="sm"
              >
                {isChartDisplayed ? (
                  <ChartDisableIcon color="textSubtle" />
                ) : (
                  <ChartIcon width="24px" color="textSubtle" />
                )}
              </ColoredIconButton>
            )}
            {isChartSupported && (
              <ColoredIconButton
                variant="text"
                scale="sm"
                onClick={() => {
                  if (!isSwapHotTokenDisplay && isChartDisplayed) {
                    toggleChartDisplayed()
                  }
                  setIsSwapHotTokenDisplay(!isSwapHotTokenDisplay)
                }}
              >
                {isSwapHotTokenDisplay ? (
                  <HotDisableIcon color="textSubtle" width="24px" />
                ) : (
                  <HotIcon color="textSubtle" width="24px" />
                )}
              </ColoredIconButton>
            )}
            <Flex alignItems="flex">
              <Button scale="sm" mr="10px">
                {t('Avoid Error')}
                {tooltipVisible && tooltip}
                <Flex ref={targetRef}>
                  <HelpIcon ml="10px" width="20px" height="20px" color="textSubtle" />
                </Flex>
              </Button>
            </Flex>
            <NotificationDot show={expertMode}>
              <GlobalSettings color="textSubtle" mr="0" mode={SettingsMode.SWAP_LIQUIDITY} />
            </NotificationDot>
            <IconButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
              <HistoryIcon color="textSubtle" width="24px" />
            </IconButton>
            <IconButton variant="text" scale="sm" onClick={handleOnClick}>
              <RefreshIcon disabled={!hasAmount} color="textSubtle" width="27px" />
            </IconButton>
          </Flex>
        </Flex>
      }
      subtitle={<></>}
    />
  )
}

export default CurrencyInputHeader
