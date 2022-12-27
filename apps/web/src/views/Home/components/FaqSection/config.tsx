import { ContextApi } from '@pancakeswap/localization'

type FAQsType = {
  t: ContextApi['t']
}

const config = ({ t }: FAQsType) => [
  {
    title: t('What is CADECEUS (CMP) blockchain ?'),
    description: [t('THE WORLD’S FIRST BLOCKCHAIN DEDICATED TO METAVERSE DEVELOPMENT')],
  },
  {
    title: t('How much gas fees on Caduceus ?'),
    description: [t('0.0001$')],
  },
  {
    title: t('Where and How to buy CMP ?'),
    description: [
      t(
        'CMP Tokens has been listed on several big exchange like Gate.io, Kucoin and another several major exchanges. All of this exchanges was support Caduceus Blockchain.',
      ),
    ],
  },
  {
    title: t('Which Chains are supported?'),
    description: [t('For now we just support Caduceus Chain (CMP)')],
  },
  {
    title: t('Is smart contract platform secured?'),
    description: [
      t('Yes, we fork Pancakeswap audited smart contract, for sure all is secured and full security audited '),
    ],
  },
  {
    title: t('Airdrops?'),
    description: [
      t('Yes!'),
      t('We launch first airdrop for testing the DEX by swap, add liquidity, farming and staking on testnet.'),
    ],
  },
]
export default config
