import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'

export const shardeumTokens = {
  wcmp: WBNB[ChainId.SHARDEUMV],
  tw: new ERC20Token(
  ChainId.SHARDEUMV,
  '0xF6b74a6ca157e990B55B822558CBE5D3147BE508',
  18,
  'TWS',
  'TowerSwap Testnet',
  'https://towerswap.finance',
  ),
  usdt: new ERC20Token(
  ChainId.SHARDEUMV,
  '0xBb5e1777A331ED93E07cF043363e48d320eb96c4',
  18,
  'USDT',
  'Tether USD',
  'https://towerswap.finance',
  ),
}
