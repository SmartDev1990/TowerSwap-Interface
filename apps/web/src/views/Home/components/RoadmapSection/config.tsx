import { ContextApi } from '@pancakeswap/localization'

type FAQsType = {
  t: ContextApi['t']
}

const config = ({ t }: FAQsType) => [
  {
    icon: '🚀',
    title: t('2022'),
    description: [
      'Caduceus blockchain identification',
      'Ideas and Concepts',
      'Website and whitepaper development',
      'Dex development and testnet integration',
      'Publish the project to the public',
      'Apply grant program',
      'Start the first Airdrop (Dex Testnet)',
    ],
    reached: 'Oct- Dec-2022 (Reached)',
  },
  {
    title: t('Q1, 2023'),
    icon: '👨‍💻',
    description: [
      'Tower Token incubators launch',
      'Mainnet Launch',
      'Farming & Staking features launch',
      'Airdrop Distribution',
      'AMA section with Caduceus and Towerswap community',
      'Start Partnership',
      'Platform Audit',
    ],
    reached: 'Jan-March 2023 (Under Progress)',
  },
  {
    title: t('Q2, 2023'),
    icon: '🌐',
    description: [
      'Tier1 TW token Exchange listing',
      'Launch NFT Marketplace',
      'Launch Caduceus Bridge',
      'Launch Caduceus LaunchPad',
    ],
    reached: 'Apr-June 2022 (Under Progress)',
  },
  {
    title: t('Q3, 2023'),
    icon: '🚀',
    description: ['Start adding other chains', 'More Partnership', 'More AirDrops'],
    reached: 'July-Sep 2022 (Under Progress)',
  },
  {
    title: t('Q4, 2023'),
    icon: '🌔',
    description: [
      'Tier2 TW token Exchange listing',
      'Starting evaluation for year project, Platform upgrade and adding currency payment system',
    ],
  },
]
export default config
