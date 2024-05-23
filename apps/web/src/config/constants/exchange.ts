import { ChainId, JSBI, Percent, Token, WNATIVE } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { shardeumTokens, bscTokens, bscTestnetTokens, USDC, USDT, BUSD, WBTC_ETH } from '@pancakeswap/tokens'
import { ChainMap, ChainTokenList } from './types'

export const ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.RINKEBY]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.GOERLI]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.BSC]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  [ChainId.BSC_TESTNET]: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  [ChainId.CMP]: '0xb0240848456412D1a33792DF4A1178053b9aecAa',
  [ChainId.ZETA_TESTNET]: '0x33fea934d76c80c9a857a766ee1354381d6c6364',
  [ChainId.ZETA]: '0xeeF9560CE1f1358011E41974dbE68F8a0Bd86E50',
  [ChainId.BASE]: '0x004Ccd46a242F279aD0aeF229d3703Fb0CcCD89a',
  [ChainId.SHARDEUMV]: '0x37b1fC2b5062526bf6b177Fdcd5992122b138c4d',
  [ChainId.QUAI]: '0x18eA3D3a9AA9Eb6c30f35d5f7b90B154165Fff8b',
}

export const PRESALE_FACTORY: ChainMap<string> = {
  [ChainId.ETHEREUM]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.CMP]: '',
  [ChainId.ZETA_TESTNET]: '0x870BA99649C234535c36756F0E85789B43dA4526',
  [ChainId.ZETA]: '',
  [ChainId.BASE]: '',
  [ChainId.SHARDEUMV]: '',
  [ChainId.QUAI]: '',
}

export const PRIVATESALE_FACTORY: ChainMap<string> = {
  [ChainId.ETHEREUM]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.CMP]: '',
  [ChainId.ZETA_TESTNET]: '0xc56126DBA5668bED9302f6EBd579D425C4df7Ae4',
  [ChainId.ZETA]: '',
  [ChainId.BASE]: '',
  [ChainId.SHARDEUMV]: '',
  [ChainId.QUAI]: '',
}

export const FAIRLAUNCH_FACTORY: ChainMap<string> = {
  [ChainId.ETHEREUM]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.CMP]: '',
  [ChainId.ZETA_TESTNET]: '0x1eDF4D8D93579d63e6Dd34cC4A4E49d54D3ab8e0',
  [ChainId.ZETA]: '',
  [ChainId.BASE]: '',
  [ChainId.SHARDEUMV]: '',
  [ChainId.QUAI]: '',
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ETHEREUM]: [WNATIVE[ChainId.ETHEREUM], USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.RINKEBY]: [WNATIVE[ChainId.GOERLI], USDC[ChainId.GOERLI], BUSD[ChainId.GOERLI]],
  [ChainId.GOERLI]: [WNATIVE[ChainId.RINKEBY], USDC[ChainId.RINKEBY], BUSD[ChainId.RINKEBY]],
  [ChainId.BSC]: [
    bscTokens.wbnb,
    bscTokens.cake,
    bscTokens.busd,
    bscTokens.usdt,
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdc,
  ],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
  [ChainId.ZETA_TESTNET]: [],
  [ChainId.ZETA]: [],
  [ChainId.CMP]: [],
  [ChainId.QUAI]: [],
  [ChainId.BASE]: [],
  [ChainId.SHARDEUMV]: [],
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {
    // SNFTS-SFUND
    [bscTokens.snfts.address]: [bscTokens.sfund],
  },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.ETHEREUM]: [USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WNATIVE[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.RINKEBY]: [USDC[ChainId.RINKEBY], WNATIVE[ChainId.RINKEBY], BUSD[ChainId.RINKEBY]],
  [ChainId.GOERLI]: [USDC[ChainId.GOERLI], WNATIVE[ChainId.GOERLI], BUSD[ChainId.GOERLI]],
  [ChainId.BSC]: [bscTokens.busd, bscTokens.cake, bscTokens.btcb],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
  [ChainId.ZETA_TESTNET]: [],
  [ChainId.ZETA]: [],
  [ChainId.CMP]: [],
  [ChainId.QUAI]: [],
  [ChainId.BASE]: [],
  [ChainId.SHARDEUMV]: [],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.ETHEREUM]: [USDC[ChainId.ETHEREUM], WNATIVE[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.RINKEBY]: [USDC[ChainId.RINKEBY], WNATIVE[ChainId.RINKEBY], BUSD[ChainId.RINKEBY]],
  [ChainId.GOERLI]: [USDC[ChainId.GOERLI], WNATIVE[ChainId.GOERLI], BUSD[ChainId.GOERLI]],
  [ChainId.BSC]: [bscTokens.wbnb, bscTokens.dai, bscTokens.busd, bscTokens.usdt, bscTokens.cake],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
  [ChainId.ZETA_TESTNET]: [],
  [ChainId.ZETA]: [],
  [ChainId.CMP]: [],
  [ChainId.QUAI]: [],
  [ChainId.BASE]: [],
  [ChainId.SHARDEUMV]: [],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.ETHEREUM]: [
    [WNATIVE[ChainId.ETHEREUM], USDC[ChainId.ETHEREUM]],
    [WBTC_ETH, WNATIVE[ChainId.ETHEREUM]],
    [WNATIVE[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM]],
  ],
  [ChainId.BSC]: [
    [bscTokens.cake, bscTokens.wbnb],
    [bscTokens.busd, bscTokens.usdt],
    [bscTokens.dai, bscTokens.usdt],
  ],
  [ChainId.ZETA_TESTNET]: [],
  [ChainId.ZETA]: [],
  [ChainId.CMP]: [],
  [ChainId.QUAI]: [],
  [ChainId.BASE]: [],
  [ChainId.SHARDEUMV]: [],
}

export const BIG_INT_ZERO = JSBI.BigInt(0)
export const BIG_INT_TEN = JSBI.BigInt(10)

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(BIG_INT_TEN, JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), BIPS_BASE)

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const BASE_FEE = new Percent(JSBI.BigInt(25), BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)

// BNB
export const DEFAULT_INPUT_CURRENCY = 'SHM'
// CAKE
export const DEFAULT_OUTPUT_CURRENCY = '0x8D6E7213bad28E00156c7ecddEFac64Cc508CAD5'

// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

export const LIMIT_ORDERS_DOCS_URL = 'https://towerswap.gitbook.io/towerswap-finance/product'

export const EXCHANGE_PAGE_PATHS = ['/swap', '/limit-orders', 'liquidity', '/add', '/find', '/remove']
