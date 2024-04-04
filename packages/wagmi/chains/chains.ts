import { rinkeby, mainnet, goerli } from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const zeta: Chain = {
  id: 7001,
  name: 'ZETA TESTNET',
  network: 'ZETA TESTNET',
  rpcUrls: {
    default: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
  },
  nativeCurrency: { name: 'Zetachain', symbol: 'aZETA', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'ZetaScan',
      url: 'https://zetachain-athens-3.blockscout.com/',
    },
  },
}

export const zetaMainnet: Chain = {
  id: 7000,
  name: 'ZETA',
  network: 'ZETA Mainnet',
  rpcUrls: {
    default: 'https://zetachain-evm.blockpi.network:443/v1/rpc/public',
  },
  nativeCurrency: { name: 'Zetachain', symbol: 'ZETA', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'ZetaScan',
      url: 'https://explorer.zetachain.com/',
    },
  },
}

export const base: Chain = {
  id: 8453,
  name: 'BASE L2',
  network: 'Base Chain',
  rpcUrls: {
    default: 'https://base-rpc.publicnode.com',
  },
  nativeCurrency: { name: 'Eth', symbol: 'ETH', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'ShardeumScan',
      url: 'https://basescan.org/',
    },
  },
}

export const shardeumValidators: Chain = {
  id: 8082,
  name: 'SHARDEUM',
  network: 'Shardeum Sphinx Validator 1.X',
  rpcUrls: {
    default: 'https://sphinx.shardeum.org',
  },
  nativeCurrency: { name: 'SHARDEUM', symbol: 'SHM', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'ShardeumScan',
      url: 'https://explorer-sphinx.shardeum.org',
    },
  },
}

export const quai: Chain = {
  id: 9000,
  name: 'QUAI',
  network: 'Cyprus1',
  rpcUrls: {
    default: 'https://rpc.cyprus1.colosseum.quaiscan.io/',
  },
  nativeCurrency: { name: 'QUAI', symbol: 'QUAI', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'QuaiScan',
      url: 'https://cyprus1.colosseum.quaiscan.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: 'https://bsc-dataseed1.defibit.io',
    default: 'https://bsc-dataseed1.defibit.io',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0x3dc18345e131a673e11401696a35e7927673eeea',
    blockCreated: 15921452,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: 'https://data-seed-prebsc-1-s3.binance.org:8545',
    default: 'https://data-seed-prebsc-1-s3.binance.org:8545',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0x3dc18345e131a673e11401696a35e7927673eeea',
    blockCreated: 17422483,
  },
  testnet: true,
}

export const cmpTestnet: Chain = {
  id: 512512,
  name: 'Caduceus Testnet',
  network: 'cmp_testnet',
  rpcUrls: {
    public: 'https://galaxy.block.caduceus.foundation',
    default: 'https://galaxy.block.caduceus.foundation',
  },
  blockExplorers: {
    default: { name: 'CMP_Testnet Explorer', url: 'https://galaxy.scan.caduceus.foundation' },
  },
  nativeCurrency: {
    name: 'Cadeceus',
    symbol: 'CMP',
    decimals: 18,
  },
  multicall: {
    address: '0x3dc18345e131a673e11401696a35e7927673eeea',
    blockCreated: 10275844,
  },
}

export const cmpMainnet: Chain = {
  id: 256256,
  name: 'CMP',
  network: 'cmp_mainnet',
  rpcUrls: {
    public: 'https://mainnet.block.caduceus.foundation',
    default: 'https://mainnet.block.caduceus.foundation',
  },
  blockExplorers: {
    default: { name: 'CMP_MAINNET Explorer', url: 'https://mainnet.scan.caduceus.foundation' },
  },
  nativeCurrency: {
    name: 'Cadeceus',
    symbol: 'CMP',
    decimals: 18,
  },
  multicall: {
    address: '0x3dc18345e131a673e11401696a35e7927673eeea',
    blockCreated: 10275844,
  },
}

export { rinkeby, mainnet, goerli }
