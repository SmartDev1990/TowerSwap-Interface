import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD_CMP, TOWER_MAINNET } from './common'

export const mainnetTokens = {
  wcmp: WBNB[ChainId.CMP],
  tw: TOWER_MAINNET[ChainId.CMP],
  syrup: new ERC20Token(ChainId.CMP, '0x2DD80bE5B44cdcB3f39dEb9cE483c8f67191f478', 18, 'Syrup', 'Syrup Bar Token'),
  busd: BUSD_CMP,
}
