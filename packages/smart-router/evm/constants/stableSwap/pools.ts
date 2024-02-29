import { ChainId } from '@pancakeswap/sdk'

import { StableSwapPool } from '../../types/pool'
import { pools as ethereumPools } from './1'
import { pools as bscPools } from './56'
import { pools as bscTestnetPools } from './97'
import { pools as zetaPools } from './7000'
import { pools as zetaTestnetPools } from './7001'

export type StableSwapPoolMap<TChainId extends number> = {
  [chainId in TChainId]: StableSwapPool[]
}

export const poolMap: StableSwapPoolMap<ChainId> = {
  [ChainId.ETHEREUM]: ethereumPools,
  [ChainId.RINKEBY]: ethereumPools,
  [ChainId.GOERLI]: ethereumPools,
  [ChainId.BSC]: bscPools,
  [ChainId.BSC_TESTNET]: bscTestnetPools,
  [ChainId.ZETA]: zetaPools,
  [ChainId.ZETA_TESTNET]: zetaTestnetPools,
}
