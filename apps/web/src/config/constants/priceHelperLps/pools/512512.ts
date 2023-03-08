import { testnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '../../types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
   {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xCF506651b80796D34085dADb1c761ebF71BB2b8d',
        token: testnetTokens.tw,
        quoteToken: testnetTokens.wcmp,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xa4B690F4F53caC099549e57e6309A11c79C6Bf56',
        token: testnetTokens.tw,
        quoteToken: testnetTokens.busd,
    }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
