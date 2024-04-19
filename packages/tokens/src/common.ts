import { ChainId, ERC20Token } from '@pancakeswap/sdk'

export const CAKE_MAINNET = new ERC20Token(
  ChainId.BSC,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const CAKE_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xFa60D973F7642B748046464e165A65B7323b0DEE',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://towerswap.finance/',
)

export const TOWER_MAINNET = new ERC20Token(
  ChainId.CMP,
  '0x49Ca6d0e819E83471575bD4e140ab9a9f4e954d5',
  18,
  'TWS',
  'TowerSwap Token',
  'https://towerswap.finance/',
)

export const TOWER_ZETA = new ERC20Token(
  ChainId.ZETA,
  '0x49Ca6d0e819E83471575bD4e140ab9a9f4e954d5',
  18,
  'TWS',
  'TowerSwap Token',
  'https://towerswap.finance/',
)

export const TOWER_SHARDEUM = new ERC20Token(
  ChainId.SHARDEUMV,
  '0x8D6E7213bad28E00156c7ecddEFac64Cc508CAD5',
  18,
  'TWS',
  'TowerSwap Token',
  'https://towerswap.finance/',
)

export const TOWER_TESTNET = new ERC20Token(
  ChainId.ZETA_TESTNET,
  '0x8D6E7213bad28E00156c7ecddEFac64Cc508CAD5',
  18,
  'TWS',
  'TowerSwap Token',
  'https://towerswap.finance/',
)

export const USDC_BSC = new ERC20Token(
  ChainId.BSC,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin',
)

export const USDC_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_CMP = new ERC20Token(
  ChainId.CMP,
  '0x8bFB6654C5cE007DD8E9474928c9Bf5199a09055',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BUSD_BSC = new ERC20Token(
  ChainId.BSC,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_CMP = new ERC20Token(
  ChainId.CMP,
  '0x33fea934d76C80C9a857a766Ee1354381d6C6364',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_CMPTESTNET = new ERC20Token(
  ChainId.ZETA_TESTNET,
  '0xEB2fb10Cb1cb9F0cd19D3d0213d2B69B368146A8',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_NET = new ERC20Token(
  ChainId.BASE,
  '0xB21668048d42d7d6423B070B278F5Af14e1f1600',
  18,
  'BUSD',
  'Tower BUSD',
  'https://www.paxos.com/busd/',
)

export const USDT_ZETA = new ERC20Token(
  ChainId.ZETA,
  '0x7c8dda80bbbe1254a7aacf3219ebe1481c6e01d7',
  18,
  'USDT',
  'USDT_ETH',
  'https://www.paxos.com/busd/',
)

export const USDT_SHARDEUMV = new ERC20Token(
  ChainId.SHARDEUMV,
  '0x96a0fa4da6270cf2b65dd21e4fc2e387edeb8951',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDC_SHARDEUMV = new ERC20Token(
  ChainId.SHARDEUMV,
  '0xd9ad6a7d0052e04b1eaa7b340d48b0fcae1aff96',
  6,
  'USDC',
  'USD Coin',
  'https://tether.to/',
)

export const BUSD_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0xb809b9B2dc5e93CB863176Ea2D565425B03c0540',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD: Record<ChainId, ERC20Token> = {
  [ChainId.ETHEREUM]: BUSD_ETH,
  [ChainId.RINKEBY]: BUSD_GOERLI,
  [ChainId.GOERLI]: BUSD_GOERLI,
  [ChainId.BSC]: BUSD_BSC,
  [ChainId.BSC_TESTNET]: BUSD_TESTNET,
  [ChainId.CMP]: BUSD_CMP,
  [ChainId.ZETA_TESTNET]: BUSD_CMPTESTNET,
  [ChainId.ZETA]: USDT_ZETA,
  [ChainId.SHARDEUMV]: USDT_SHARDEUMV,
  [ChainId.BASE]: USDT_SHARDEUMV,
  [ChainId.QUAI]: BUSD_NET,
}

export const CAKE = {
  [ChainId.BSC]: CAKE_MAINNET,
  [ChainId.BSC_TESTNET]: CAKE_TESTNET,
}

export const TW = {
  [ChainId.CMP]: TOWER_MAINNET,
  [ChainId.ZETA_TESTNET]: TOWER_TESTNET,
  [ChainId.ZETA]: TOWER_ZETA,
  [ChainId.SHARDEUMV]: TOWER_SHARDEUM,
}

export const USDC = {
  [ChainId.BSC]: USDC_BSC,
  [ChainId.BSC_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.GOERLI]: USDC_GOERLI,
  [ChainId.SHARDEUMV]: USDC_SHARDEUMV,
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
  [ChainId.ETHEREUM]: USDT_ETH,
  [ChainId.CMP]: USDT_CMP,
}

export const WBTC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)
