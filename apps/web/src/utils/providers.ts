import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const BSC_PROD_NODE = process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://bsc.nodereal.io'

export const CMP_PROD_NODE = 'https://sphinx.shardeum.org'

export const bscRpcProvider = new StaticJsonRpcProvider(BSC_PROD_NODE)

export const shardeumRpcProvider = new StaticJsonRpcProvider(CMP_PROD_NODE)

export default null
