import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { USDT_SHARDEUMV, TOWER_SHARDEUM } from './common'

export const shardeumTokens = {
  wcmp: WBNB[ChainId.SHARDEUMV],
  tw: TOWER_SHARDEUM,
  busd: USDT_SHARDEUMV,
}
