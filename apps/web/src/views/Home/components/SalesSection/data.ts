import { TranslateFunction } from '@pancakeswap/localization'
import { SalesSectionProps } from '.'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade your favorite Token'),
  bodyText: t(
    'Towerswap is the first dex with an adequate UI for beginners. anyone can trade any token under Caduceus Blokchain.  ' +
      'with almost zero fees, lowest slippage and guaranteed asset security will make anyone feel comfortable when trading on our DEX. ',
  ),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance/product/exchange',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/bridge/',
    attributes: [
      { src: 'phone_b', alt: t('Pie chart') },
      { src: 'phone', alt: t('Stocks chart') },
      { src: 'phone_a', alt: t('Folder with cake token') },
    ],
  },
})

export const bridgeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade your favorite NFT items'),
  bodyText: t(
    'Towerswap provides NFT marketplace service, ' +
      'Everyone can buy, sell and trade their NFT here. Towerswap does not charge a listing fee. ' +
      'a fee of 2% of each trade will be taken to buy back TW tokens and burned. ',
  ),
  reverse: true,
  primaryButton: {
    to: '/',
    text: 'Coming Soon',
    external: false,
  },
  secondaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance',
    text: '',
    external: true,
  },
  images: {
    path: '/images/home/bridge/',
    attributes: [
      { src: 'bridge_a', alt: t('Folder with cake token') },
      { src: 'bridge_b', alt: t('Stocks chart') },
    ],
  },
})

export const earnSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Earn extra income.'),
  bodyText: t(
    'Get additional income through the features that we have provided, We have prepared farming and staking features so that the tokens that you have work for you, everyone is free to choose where their tokens will be stored and we have prepared a place..',
  ),
  reverse: false,
  primaryButton: {
    to: '/farms',
    text: t('Explore'),
    external: false,
  },
  secondaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance',
    text: '',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [{ src: 'ice', alt: t('Pie chart') }],
  },
})

export const moreSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('TowerLabs Features'),
  bodyText: t(
    'Towerlabs is the latest feature to be developed by our team.  ' +
      'Its features include, automatic token maker without the need for coding, token lock and liquidity lock. ',
  ),
  reverse: true,
  primaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance',
    text: 'Coming Soon',
    external: false,
  },
  secondaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance',
    text: '',
    external: true,
  },
  images: {
    path: '/images/home/bridge/',
    attributes: [{ src: 'labs', alt: t('Stocks chart') }],
  },
})

export const launchpadSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Tower Launchpad'),
  bodyText: t(
    'Get additional income through the features that we have provided, We have prepared farming and staking features so that the tokens that you have work for you, everyone is free to choose where their tokens will be stored and we have prepared a place..',
  ),
  reverse: false,
  primaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance',
    text: t('Coming Soon'),
    external: false,
  },
  secondaryButton: {
    to: 'https://towerswap.gitbook.io/towerswap-finance',
    text: t(''),
    external: true,
  },
  images: {
    path: '/images/home/bridge/',
    attributes: [{ src: 'hero', alt: t('Folder with cake token') }],
  },
})
