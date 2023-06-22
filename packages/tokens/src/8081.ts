import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'

export const shardeumTokens = {
  wcmp: WBNB[ChainId.SHARDEUM],
  tw: new ERC20Token(
  ChainId.SHARDEUM,
  '0x828AefE6579eBc100788128C3db8c7ECc8844A62',
  18,
  'TWST',
  'TowerSwap Testnet',
  'https://towerswap.finance',
  ),
  usdt: new ERC20Token(
  ChainId.SHARDEUM,
  '0x8bfF3074829588E2CE5f6B1dA45e65D0C5a611b3',
  18,
  'USDT',
  'Tether USD',
  'https://towerswap.finance',
  ),
}
