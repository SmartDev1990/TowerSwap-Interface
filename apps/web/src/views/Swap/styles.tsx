import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 120px' : 'padding: 0 40px')};
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 350px;
  border-radius: 24px;
  box-shadow: 3px 3px 5px 3px #373308;
  margin: 0px 0px 20px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 420px;
    border-radius: 24px;
    box-shadow: 3px 3px 5px 3px #373308;
    margin: 0px 0px 20px;
  }
`
