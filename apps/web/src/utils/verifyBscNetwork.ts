import { ChainId } from '@pancakeswap/sdk'

export const verifyBscNetwork = (chainId: number) => {
  return chainId === ChainId.ZETA_TESTNET || chainId === ChainId.ZETA
}
