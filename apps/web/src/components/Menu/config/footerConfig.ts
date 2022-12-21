import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: '',
        isHighlighted: true,
      },
      {
        label: t('Whitepaper'),
        href: '',
      },
      {
        label: t('Community'),
        href: 'https://t.me/towerfi',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Guides'),
        href: '',
      },
    ],
  },
]
