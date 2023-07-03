import { SerializedFarmConfig } from '@pancakeswap/farms'
import { mainnetTokens } from '@pancakeswap/tokens'

const priceHelperLps: SerializedFarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'TWS-WCMP LP',
    lpAddress: '0xc1f595579c46acfb33902db3d7cff34bd6355615',
    token: mainnetTokens.tw,
    quoteToken: mainnetTokens.wcmp,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
