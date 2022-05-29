// Polygon Mainnet Params
export const POLYGON_MAINNET_PARAMS = {
  chainId: '0x89', // 137
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mainnet.matic.quiknode.pro'],
  blockExplorerUrls: ['https://polygonscan.com/']
}

// Polygon Testnet params
export const POLYGON_TESTNET_PARAMS = {
  chainId: '0x13881', // 8001
  chainName: 'Mumbai',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/pQZMy8uRbwDe40VDwmBLGnpMp9rZiX4s'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
}