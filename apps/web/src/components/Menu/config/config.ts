import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  BridgeIcon,
  BridgeFillIcon,
  FaucetIcon,
  FaucetFillIcon,
  EarnFillIcon,
  LiquidityFillIcon,
  LiquidityIcon,
  EarnIcon,
  ShareIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  DropdownMenuItems,
  RocketIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
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
      showItemsOnMobile: true,
      supportChainIds: SUPPORT_ONLY_BSC,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        // {
        //   label: t('Limit'),
        //   href: '/limit-orders',
        //   supportChainIds: SUPPORT_ONLY_BSC,
        //   image: '/images/decorations/3d-coin.png',
        // },
        {
          label: t('Liquidity'),
          href: '/liquidity',
          supportChainIds: SUPPORT_ONLY_BSC,
        },
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
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      showItemsOnMobile: true,
      items: [
        {
          label: t('Liquidity Farms'),
          href: '/farms',
        },
        {
          label: t('Staking Pools'),
          href: '/pools',
          supportChainIds: SUPPORT_ONLY_BSC,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Launchpad'),
      href: 'https://towerpad.org',
      icon: RocketIcon,
      fillIcon: RocketIcon,
      showItemsOnMobile: false,
      type: DropdownMenuItemType.EXTERNAL_LINK,
      // supportChainIds: SUPPORT_ONLY_BSC,
      items: [
        // {
        //   label: t('Launchpad List'),
        //   href: '/Launchpad',
        // },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('NFT'),
      href: '/nfts',
      icon: NftIcon,
      fillIcon: NftFillIcon,
      image: '/images/decorations/nft.png',
      items: [
        {
          label: t('MarketPlace'),
          href: '/nfts',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },

    {
      label: 'More',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Bridge'),
          href: 'https://emmet.finance/bridge',
          type: DropdownMenuItemType.EXTERNAL_LINK,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          label: t('WhitePaper'),
          href: 'https://drive.google.com/file/d/1XJpsXJnlIUo2I7GQcoLCLaD2M7BYJisV/view?usp=drive_link',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('PitchDeck'),
          href: 'https://drive.google.com/file/d/1xtNZbJ6tfF8IhUUS_zGKWuoQNdHQVKWL/view?usp=drive_link',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
