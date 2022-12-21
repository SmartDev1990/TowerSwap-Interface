import { ChainId } from '@pancakeswap/sdk'

export const verifyBscNetwork = (chainId: number) => {
  return chainId === ChainId.CMP || chainId === ChainId.CMP_TESTNET
}
