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
      primarySrc: `/images/tokens/${testnetTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake CAKE</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 600000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible CAKE</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: <Trans>Stake CAKE to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${testnetTokens.cake.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: Pool.SerializedPoolConfig<SerializedWrappedToken>[] = [
  {
    sousId: 0,
    stakingToken: testnetTokens.cake,
    earningToken: testnetTokens.cake,
    contractAddress: {
      256256: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      56: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      512512: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '10',
    isFinished: false,
  },
  /*
  {
    sousId: 1,
    stakingToken: testnetTokens.cake,
    earningToken: testnetTokens.cake,
    contractAddress: {
      256256: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      56: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      512512: '0x82F6fC7AD9124Ef3196a571E6d06De0713437736',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '100',
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: testnetTokens.cake,
    earningToken: testnetTokens.wbnb,
    contractAddress: {
      256256: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      56: '0xdd25bdce10e6c7d4bb4804fe1f5d2aa04aac8d01',
      512512: '0x201583a8907F76EC2f0300052d88c70b7b97dA34',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '1000',
    isFinished: false,
  },
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
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
const finishedPools = [].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export default [...livePools, ...finishedPools] as Pool.SerializedPoolConfig<SerializedWrappedToken>[]
