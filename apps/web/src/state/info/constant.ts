import { BLOCKS_CLIENT, BLOCKS_CLIENT_ETH, INFO_CLIENT, INFO_CLIENT_ETH } from 'config/constants/endpoints'
import { infoClientETH, infoClient, infoStableSwapClient } from 'utils/graphql'

import { ChainId } from '@pancakeswap/sdk'
import { ETH_TOKEN_BLACKLIST, PCS_ETH_START, PCS_V2_START, TOKEN_BLACKLIST } from 'config/constants/info'

export type MultiChainName = 'BSC' | 'ETH'

export const multiChainQueryMainToken = {
  BSC: 'CMP',
  ETH: 'ETH',
}

export const multiChainBlocksClient = {
  BSC: 'http://127.0.0.1:8000/subgraphs/name/Towerswap-info',
  ETH: BLOCKS_CLIENT_ETH,
}

export const multiChainStartTime = {
  BSC: 8438988,
  ETH: PCS_ETH_START,
}

export const multiChainId = {
  BSC: ChainId.CMP,
  ETH: ChainId.ETHEREUM,
}

export const multiChainPaths = {
  [ChainId.CMP]: '',
  [ChainId.ETHEREUM]: '/eth',
}

export const multiChainQueryClient = {
  BSC: infoClient,
  ETH: infoClientETH,
}

export const multiChainQueryEndPoint = {
  BSC: 'http://127.0.0.1:8000/subgraphs/name/Towerswap-info',
  ETH: INFO_CLIENT_ETH,
}

export const multiChainScan = {
  BSC: 'https://mainnet.scan.caduceus.foundation/',
  ETH: 'EtherScan',
}

export const multiChainTokenBlackList = {
  BSC: TOKEN_BLACKLIST,
  ETH: ETH_TOKEN_BLACKLIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient
  return multiChainQueryClient[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
