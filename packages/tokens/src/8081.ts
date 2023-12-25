import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'

export const shardeumTokens = {
  wcmp: WBNB[ChainId.SHARDEUM],
  tw: new ERC20Token(
    ChainId.SHARDEUM,
    '0x8D6E7213bad28E00156c7ecddEFac64Cc508CAD5',
    18,
    'TWS',
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
