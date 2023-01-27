import { testnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'TW',
    lpAddress: '0x09FB691A786284e99D122D2B68dE40D253fec299',
    token: testnetTokens.syrup,
    quoteToken: testnetTokens.wcmp,
  },
  {
    pid: 1,
    v1pid: 1,
    lpSymbol: 'TW-WCMP LP',
    lpAddress: '0xCF506651b80796D34085dADb1c761ebF71BB2b8d',
    token: testnetTokens.tw,
    quoteToken: testnetTokens.wcmp,
  },
  {
    pid: 2,
    v1pid: 2,
    lpSymbol: 'TW-BUSD LP',
    lpAddress: '0xa4B690F4F53caC099549e57e6309A11c79C6Bf56',
    token: testnetTokens.tw,
    quoteToken: testnetTokens.busd,
  },
  {
    pid: 3,
    v1pid: 3,
    lpSymbol: 'BUSD_WCMP LP',
    lpAddress: '0x6b9dB0B7504e04E2a4E5C4B6B22bD84E9a8710fd',
    token: testnetTokens.busd,
    quoteToken: testnetTokens.wcmp,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
