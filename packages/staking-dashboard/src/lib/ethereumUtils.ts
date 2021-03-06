type networks = 'mainnet' | 'ropsten' | 'rinkeby' | 'kovan'

enum networkIds {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  kovan = 42
}

function getNetworkIdByString(networkName: networks | undefined): 1 | 3 | 4 | 42 | 0 {
  if (!networkName || !networkIds[networkName]) {
    return 0
  }
  return networkIds[networkName]
}

function getWeb3ProviderSettings(networkId: number | null) {
  let networkName
  let etherscanURL

  switch (networkId) {
    case 1:
      networkName = 'mainnet'
      etherscanURL = 'https://etherscan.io/'
      break
    case 3:
      networkName = 'ropsten'
      etherscanURL = 'https://ropsten.etherscan.io/'
      break
    case 4:
      networkName = 'rinkeby'
      etherscanURL = 'https://rinkeby.etherscan.io/'
      break
    case 42:
      networkName = 'kovan'
      etherscanURL = 'https://kovan.etherscan.io/'
      break
    default:
      networkId = 0
      networkName = 'local'
      etherscanURL = ''
      break
  }
  return {
    networkId,
    networkName,
    etherscanURL
  }
}

export default {
  getNetworkIdByString,
  getWeb3ProviderSettings
}
