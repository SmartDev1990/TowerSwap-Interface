import { BLOCKS_CLIENT, BLOCKS_CLIENT_ETH, INFO_CLIENT, INFO_CLIENT_ETH } from 'config/constants/endpoints'
import { infoClientETH, infoClient, infoStableSwapClient } from 'utils/graphql'

import { ChainId } from '@pancakeswap/sdk'
import { ETH_TOKEN_BLACKLIST, PCS_ETH_START, PCS_V2_START, TOKEN_BLACKLIST } from 'config/constants/info'

export type MultiChainName = 'BASE' | 'SHM'

export const multiChainQueryMainToken = {
  BASE: 'BASE',
  SHM: 'SHM',
}

export const multiChainBlocksClient = {
  BASE: INFO_CLIENT,
  SHM: "http://127.0.0.1:8000/subgraphs/name/Towerswap-block",
}

export const multiChainStartTime = {
  BASE: 8438988,
  SHM: 12028,
}

export const multiChainId = {
  BASE: ChainId.BASE,
  SHM: ChainId.SHARDEUMV,
}

export const multiChainPaths = {
  [ChainId.BASE]: '/base',
  [ChainId.SHARDEUMV]: '/shm',
}

export const multiChainQueryClient = {
  BASE: infoClient,
  SHM: infoClientETH,
}

export const multiChainQueryEndPoint = {
  BASE: "http://127.0.0.1:8000/subgraphs/name/Towerswap-info-eth",
  SHM: "http://127.0.0.1:8000/subgraphs/name/Towerswap-info",
}

export const multiChainScan = {
  BASE: 'https://basescan.org/',
  SHM: 'https://explorer-sphinx.shardeum.org/',
}

export const multiChainTokenBlackList = {
  BASE: TOKEN_BLACKLIST,
  SHM: ETH_TOKEN_BLACKLIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient
  return multiChainQueryClient[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
