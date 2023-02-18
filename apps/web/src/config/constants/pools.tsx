import { BigNumber } from '@ethersproject/bignumber'
import { Pool } from '@pancakeswap/uikit'
import { SerializedWrappedToken } from '@pancakeswap/token-lists'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { testnetTokens } from '@pancakeswap/tokens'
import { PoolCategory } from './types'

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto CAKE</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.tw.symbol}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake TW</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 600000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.tw.symbol}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible TW</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.tw.symbol}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: <Trans>Stake CAKE to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.tw.symbol}.png`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: Pool.SerializedPoolConfig<SerializedWrappedToken>[] = [
  // Auto TW: 512512: '0x86AF084E7d9Ca3D7a435F69295cDFB34416A7eBd',
  {
    sousId: 0,
    stakingToken: testnetTokens.tw,
    earningToken: testnetTokens.tw,
    contractAddress: {
      256256: '',
      512512: '0x86AF084E7d9Ca3D7a435F69295cDFB34416A7eBd',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '100',
    isFinished: false,
  },
  /*
  {
    sousId: 1,
    stakingToken: testnetTokens.tw,
    earningToken: testnetTokens.tw,
    contractAddress: {
      256256: '',
      512512: '0x7c21087c20d0078A183AC0b409539C2b74242455',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '8',
    isFinished: false,
  },
  */
  {
    sousId: 2,
    stakingToken: testnetTokens.busd,
    earningToken: testnetTokens.tw,
    contractAddress: {
      256256: '',
      512512: '0xF9f7F84cD9DC507cb71D5a037E89e8A94a68A74b',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '8',
    isFinished: false,
  },
  {
    sousId: 3,
    stakingToken: testnetTokens.wcmp,
    earningToken: testnetTokens.busd,
    contractAddress: {
      256256: '',
      512512: '0x9e91b078BEf5a0AC4B532AbB3F7819914451b3a8',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.08',
    isFinished: false,
  },
  /*
  {
    sousId: 2,
    stakingToken: testnetTokens.tw,
    earningToken: testnetTokens.busd,
    contractAddress: {
      256256: '',
      512512: '0x2132921e45139Ca153992555bDCf7F3C0c63E004',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.03',
    isFinished: false,
  },
  /*
  {
    sousId: 3,
    stakingToken: testnetTokens.tw,
    earningToken: testnetTokens.busd,
    contractAddress: {
      256256: '',
      512512: '0xEBAb681E2453aa7e8BD9666AE3ff3e59B88db091',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '100',
    Version: 3,
  },
  /*
  {
    sousId: 3,
    stakingToken: testnetTokens.cake,
    earningToken: testnetTokens.busd,
    contractAddress: {
      256256: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      56: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      512512: '0xe9047467CBFb9c9B1c6f831666301718689fCD11',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '100',
    isFinished: false,
  },
  */
]

// known finished pools
const finishedPools = [].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export default [...livePools, ...finishedPools] as Pool.SerializedPoolConfig<SerializedWrappedToken>[]
