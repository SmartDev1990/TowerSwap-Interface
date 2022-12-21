import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD_CMPTESTNET, USDT_CMPTESTNET, TOWER_TESTNET } from './common'

export const testnetTokens = {
  wbnb: WBNB[ChainId.CMP_TESTNET],
  cake: TOWER_TESTNET,
  syrub: new ERC20Token(
    ChainId.CMP_TESTNET,
    '0x2DD80bE5B44cdcB3f39dEb9cE483c8f67191f478',
    18,
    'Syrub',
    'SyrubBar Token',
    'https://towerswap.finance',
  ),
  busd: BUSD_CMPTESTNET,
  usdt: BUSD_CMPTESTNET,
}
