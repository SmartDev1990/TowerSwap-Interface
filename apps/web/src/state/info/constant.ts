import { BLOCKS_CLIENT, BLOCKS_CLIENT_ETH, INFO_CLIENT, INFO_CLIENT_ETH } from 'config/constants/endpoints'
import { infoClientETH, infoClient, infoStableSwapClient } from 'utils/graphql'

import { ChainId } from '@pancakeswap/sdk'
import { ETH_TOKEN_BLACKLIST, PCS_ETH_START, PCS_V2_START, TOKEN_BLACKLIST } from 'config/constants/info'

export type MultiChainName = 'ZETA' | 'SHM'

export const multiChainQueryMainToken = {
  ZETA: 'ZETA',
  SHM: 'SHM',
}

export const multiChainBlocksClient = {
  ZETA: INFO_CLIENT,
  SHM: "http://127.0.0.1:8000/subgraphs/name/Towerswap-block",
}

export const multiChainStartTime = {
  ZETA: 8438988,
  SHM: 12028,
}

export const multiChainId = {
  ZETA: ChainId.ZETA,
  SHM: ChainId.SHARDEUMV,
}

export const multiChainPaths = {
  [ChainId.ZETA]: '/zeta',
  [ChainId.SHARDEUMV]: '',
}

export const multiChainQueryClient = {
  ZETA: infoClient,
  SHM: infoClientETH,
}

export const multiChainQueryEndPoint = {
  ZETA: "http://127.0.0.1:8000/subgraphs/name/Towerswap-info",
  SHM: "http://127.0.0.1:8000/subgraphs/name/Towerswap-info-eth",
}

export const multiChainScan = {
  ZETA: 'https://mainnet.scan.caduceus.foundation/',
  SHM: 'https://explorer-sphinx.shardeum.org/',
}

export const multiChainTokenBlackList = {
  ZETA: TOKEN_BLACKLIST,
  SHM: ETH_TOKEN_BLACKLIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient
  return multiChainQueryClient[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
