import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD_CMPTESTNET, TOWER_TESTNET } from './common'

export const testnetTokens = {
  wbnb: WBNB[ChainId.CMP_TESTNET],
  bnb: new ERC20Token(
    ChainId.CMP_TESTNET,
    '0xaB6b6212e5443228D586cE5Aeb54B02b185208Cc',
    18,
    'WCMP',
    'Wrapped CMP',
    'https://towerswap.finance',
  ),
  cake: TOWER_TESTNET,
  syrub: new ERC20Token(
    ChainId.CMP_TESTNET,
    '0x2DD80bE5B44cdcB3f39dEb9cE483c8f67191f478',
    18,
    'Syrub',
    'SyrubBar Token',
    'https://towerswap.finance',
  ),
  usdt: new ERC20Token(
    ChainId.CMP_TESTNET,
    '0x55A9f6AA17886DC17E407b3Ec4570f0CA8b9704a',
    6,
    'USDT',
    'Tower USDT',
    'https://towerswap.finance',
  ),
  busd: BUSD_CMPTESTNET,
}
