import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD_CMP, USDT_CMP, TOWER_MAINNET } from './common'

export const mainnetTokens = {
  wbnb: WBNB[ChainId.CMP],
  cake: TOWER_MAINNET[ChainId.CMP],
  syrub: new ERC20Token(ChainId.CMP, '0x2DD80bE5B44cdcB3f39dEb9cE483c8f67191f478', 18, 'Syrub', 'Syrub Bar Token'),
  busd: BUSD_CMP,
  usdt: USDT_CMP,
}
