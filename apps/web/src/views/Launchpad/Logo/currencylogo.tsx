import { ChainId } from '@pancakeswap/sdk'
import { ChainMap, ChainTokenList } from 'config/constants/types'

export const CURRENCY_TEXT: ChainMap<string> = {
  [ChainId.ETHEREUM]: 'ETH',
  [ChainId.RINKEBY]: 'rinkeby',
  [ChainId.GOERLI]: 'goerly',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC',
  [ChainId.CMP]: 'CMP',
  [ChainId.CMP_TESTNET]: 'ZETA',
  [ChainId.SHARDEUM]: 'SHM',
  [ChainId.SHARDEUMV]: 'SHM',
  [ChainId.QUAI]: 'QUAI',
}
