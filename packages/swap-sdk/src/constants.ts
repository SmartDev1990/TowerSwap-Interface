import { ERC20Token } from './entities/token'

export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  CMP = 256256,
  ZETA_TESTNET = 7001,
  BASE = 8453,
  SHARDEUMV = 8082,
  QUAI = 9000,
  ZETA = 7000,
}

export const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

const FACTORY_ADDRESS_ETH = '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362'

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.RINKEBY]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: FACTORY_ADDRESS_ETH,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0x6725f303b657a9451d8ba641348b6761a6cc7a17',
  [ChainId.CMP]: '0x55A9f6AA17886DC17E407b3Ec4570f0CA8b9704a', //unverify contract
  [ChainId.ZETA_TESTNET]: '0x49Ca6d0e819E83471575bD4e140ab9a9f4e954d5',
  [ChainId.BASE]: '0xC8155642Fe818A37AF29640125154D93773955A0',
  [ChainId.SHARDEUMV]: '0x289805470b28062134397d2101a49e816B65A400',
  [ChainId.QUAI]: '0x1B9735cFB121153536647182fE122d85D6Ae1dB1',
  [ChainId.ZETA]: '0x67f232ee36996ccb863f36e74b093e19851e24c7',
}
export const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'

const INIT_CODE_HASH_ETH = '0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.RINKEBY]: INIT_CODE_HASH_ETH,
  [ChainId.GOERLI]: INIT_CODE_HASH_ETH,
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
  [ChainId.CMP]: '0xf6106b14de90ff9d265a71eb198a4c0cb6eb1e3eb65b5d976cd5c6466315e7ae',
  [ChainId.ZETA_TESTNET]: '0xae2716f3f717dc7a8bff548df955914dbd417b22c2c0fece9c0880b203d4b359',
  [ChainId.BASE]: '0x3c8032befb466b43932c763d43f587a07b3ed9f942c06708df3559a59bd1d772',
  [ChainId.SHARDEUMV]: '0x609cc06564a710bd7cbf1e1bae2ee6326a12c0b73738abbb1966ec45a6a5c0b9',
  [ChainId.QUAI]: '0x0feeaa479bd613d42ac33abf72367f6b85fcd6d3fb5a921fd43db22f159610a6',
  [ChainId.ZETA]: '0x711ae310e33aea41a31700684f47c01c9ef51dfd5930c0e16d4d4bd2f6ec78ce',
}

export const WETH9 = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.RINKEBY]: new ERC20Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.GOERLI]: new ERC20Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

export const WBNB = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC_TESTNET]: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.CMP]: new ERC20Token(
    ChainId.CMP,
    '0x1fcbA3Cb797465F38839F48CA7c9cDA9d9aac28b',
    18,
    'WCMP',
    'Wrapped CMP',
    'https://www.binance.org'
  ),
  [ChainId.ZETA_TESTNET]: new ERC20Token(
    ChainId.ZETA_TESTNET,
    '0xF88EF72D453B94ABB390275dA1a02Fc0CB723b5F',
    18,
    'WZETA',
    'Wrapped ZETA',
    'https://www.zetachain.org'
  ),
  [ChainId.BASE]: new ERC20Token(
    ChainId.BASE,
    '0x4200000000000000000000000000000000000006',
    18,
    'ETH',
    'Wrapped ETH',
    'https://www.base.org'
  ),
  [ChainId.SHARDEUMV]: new ERC20Token(
    ChainId.SHARDEUMV,
    '0x2daeE5655d8d93Fc06929A26E1036e19627DCE0A',
    18,
    'WSHM',
    'Wrapped SHARDEUM',
    'https://www.shardeum.org'
  ),
  [ChainId.QUAI]: new ERC20Token(
    ChainId.QUAI,
    '0x14e756126AE02064dEb5E8FC006F6D2178B7B9A0',
    18,
    'WQUAI',
    'Wrapped QUAI',
    'https://Qu.ai'
  ),
  [ChainId.ZETA]: new ERC20Token(
    ChainId.ZETA,
    '0x5f0b1a82749cb4e2278ec87f8bf6b618dc71a8bf',
    18,
    'WZETA',
    'Wrapped ZETA',
    'https://www.zetachain.org'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
  [ChainId.GOERLI]: WETH9[ChainId.GOERLI],
  [ChainId.BSC]: WBNB[ChainId.BSC],
  [ChainId.BSC_TESTNET]: WBNB[ChainId.BSC_TESTNET],
  [ChainId.CMP]: WBNB[ChainId.CMP],
  [ChainId.ZETA_TESTNET]: WBNB[ChainId.ZETA_TESTNET],
  [ChainId.BASE]: WBNB[ChainId.BASE],
  [ChainId.SHARDEUMV]: WBNB[ChainId.SHARDEUMV],
  [ChainId.QUAI]: WBNB[ChainId.QUAI],
  [ChainId.ZETA]: WBNB[ChainId.ZETA],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.RINKEBY]: { name: 'Rinkeby Ether', symbol: 'RIN', decimals: 18 },
  [ChainId.GOERLI]: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
  [ChainId.BSC]: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  [ChainId.BSC_TESTNET]: {
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
    decimals: 18,
  },
  [ChainId.CMP]: { name: 'CMP', symbol: 'CMP', decimals: 18 },
  [ChainId.ZETA_TESTNET]: { name: 'ZETA', symbol: 'aZETA', decimals: 18 },
  [ChainId.ZETA]: { name: 'ZETA', symbol: 'ZETA', decimals: 18 },
  [ChainId.BASE]: { name: 'Eth', symbol: 'ETH', decimals: 18 },
  [ChainId.SHARDEUMV]: { name: 'SHARDEUM', symbol: 'SHM', decimals: 18 },
  [ChainId.QUAI]: { name: 'QUAI', symbol: 'QUAI', decimals: 18 },
}
