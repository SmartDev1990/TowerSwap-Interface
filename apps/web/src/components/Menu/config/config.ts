import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  FaucetIcon,
  FaucetFillIcon,
  EarnFillIcon,
  LiquidityFillIcon,
  LiquidityIcon,
  EarnIcon,
  // TrophyIcon,
  ShareIcon,
  // TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
// import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { perpTheme } from 'utils/getPerpetualTheme'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Exchange'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      supportChainIds: SUPPORT_ONLY_BSC,
      items: [
        // {
        //   label: t('Swap'),
        //   href: '/swap',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        // },
        // {
        //   label: t('Limit'),
        //   href: '/limit-orders',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        //   image: '/images/decorations/3d-coin.png',
        // },
        // {
        //   label: t('Liquidity'),
        //   href: '/liquidity',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        // },
        // {
        //   label: t('Perpetual'),
        //   href: `https://perp.pancakeswap.finance/${perpLangMap(languageCode)}/futures/BTCUSDT?theme=${perpTheme(
        //     isDark,
        //   )}`,
        //   supportChainIds: SUPPORT_ONLY_BSC,
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
        // {
        //   label: t('Bridge'),
        //   href: 'https://bridge.pancakeswap.finance/',
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Pool'),
      icon: LiquidityIcon,
      fillIcon: LiquidityFillIcon,
      href: '/liquidity',
      showItemsOnMobile: false,
      supportChainIds: SUPPORT_ONLY_BSC,
      items: [].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      showItemsOnMobile: false,
      items: [
        {
          label: t('Farms'),
          href: '/farms',
        },
        {
          label: t('Pools'),
          href: '/pools',
          supportChainIds: SUPPORT_ONLY_BSC,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    /*
    {
      label: t('Faucet'),
      href: 'https://faucet-dapps.shardeum.org/',
      type: DropdownMenuItemType.EXTERNAL_LINK,
      icon: FaucetIcon,
      fillIcon: FaucetFillIcon,
      items: [
        {
          label: t('Zeta Faucet'),
          href: 'https://mirror.xyz/0xe61FEacC0F78538Cd1C7cDBACD46d7c7EB50d562/i5rHBWO6CbvXyHYeooiIpnsqtLPGvYBEMRnl75cQaFM',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          label: t('Shardeum Faucet'),
          href: 'https://faucet-dapps.shardeum.org/',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('Win'),
    //   href: '/prediction',
    //   icon: TrophyIcon,
    //   fillIcon: TrophyFillIcon,
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   items: [
    //     {
    //       label: t('Trading Competition'),
    //       href: '/competition',
    //       image: '/images/decorations/tc.png',
    //       hideSubNav: true,
    //     },
    //     {
    //       label: t('Prediction (BETA)'),
    //       href: '/prediction',
    //       image: '/images/decorations/prediction.png',
    //     },
    //     {
    //       label: t('Lottery'),
    //       href: '/lottery',
    //       image: '/images/decorations/lottery.png',
    //     },
    //     {
    //       label: t('Pottery (BETA)'),
    //       href: '/pottery',
    //       image: '/images/decorations/lottery.png',
    //     },
    //   ],
    // },
    */
    {
      label: t('NFT'),
      href: '/nfts',
      icon: NftIcon,
      fillIcon: NftFillIcon,
      image: '/images/decorations/nft.png',
      items: [
    // {
    //   label: t('Overview'),
    //   href: `${nftsBaseUrl}`,
    // },
    // {
    //   label: t('Collections'),
    //   href: `${nftsBaseUrl}/collections`,
    // },
    // {
    //   label: t('Activity'),
    //   href: `${nftsBaseUrl}/activity`,
    // },
      ],
    },
    /*
    {
      label: 'Docs',
      href: 'https://towerswap.gitbook.io/towerswap-finance',
      type: DropdownMenuItemType.EXTERNAL_LINK,
      icon: ShareIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Docs'),
          href: 'https://towerswap.gitbook.io/towerswap-finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('PitchDeck'),
          href: 'https://docdro.id/thzR1J1',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('Zeta Faucet'),
          href: 'https://mirror.xyz/0xe61FEacC0F78538Cd1C7cDBACD46d7c7EB50d562/i5rHBWO6CbvXyHYeooiIpnsqtLPGvYBEMRnl75cQaFM',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          label: t('Shardeum Faucet'),
          href: 'https://faucet-dapps.shardeum.org/',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    */
    {
      label: 'More',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        // {
        //   label: t('Stake'),
        //   href: '/pools',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        // },
        {
          label: t('Zeta Faucet'),
          href: 'https://mirror.xyz/0xe61FEacC0F78538Cd1C7cDBACD46d7c7EB50d562/i5rHBWO6CbvXyHYeooiIpnsqtLPGvYBEMRnl75cQaFM',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          label: t('Shardeum Faucet'),
          href: 'https://faucet-dapps.shardeum.org/',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          label: t('Docs'),
          href: 'https://towerswap.gitbook.io/towerswap-finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('PitchDeck'),
          href: 'https://docdro.id/thzR1J1',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        // {
        //   label: t('IFO'),
        //   href: '/ifo',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        //   image: '/images/ifos/ifo-bunny.png',
        // },
        // {
        //   label: t('Voting'),
        //   href: '/voting',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        //   image: '/images/voting/voting-bunny.png',
        // },
        // {
        //   type: DropdownMenuItemType.DIVIDER,
        // },
        // {
        //   label: t('Leaderboard'),
        //   href: '/teams',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        //   image: '/images/decorations/leaderboard.png',
        // },
        // {
        //   type: DropdownMenuItemType.DIVIDER,
        // },
        // {
        //   label: t('Blog'),
        //   href: 'https://medium.com/pancakeswap',
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
