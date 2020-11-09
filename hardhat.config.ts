import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@tenderly/hardhat-tenderly'
import 'hardhat-deploy'
import 'hardhat-typechain'

const secrets = require('./keystore/secrets.json')

const config: any = {
  paths: {
    sources: './contracts',
    artifacts: './artifacts',
    tests: './test'
  },
  solidity: {
    version: '0.5.17'
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${secrets.alchemy.apiKey}`,
        blockNumber: 11220000
      }
    }
  },
  tenderly: {
    username: `${secrets.tenderly.username}`,
    project: `${secrets.tenderly.project}`
  }
}

export default config
