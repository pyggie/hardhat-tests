// A deployment script run by the hardhat-deploy plugin during 'npx hardhat deploy'
// See https://github.com/wighawag/hardhat-deploy

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { BigNumber } from 'ethers'

const contractName = 'Test'

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Deploying ${contractName} ...`)
  const { deployments } = hre
  const { deploy } = deployments
  const provider = hre.ethers.provider
  const accounts = await provider.listAccounts()
  const deployer = accounts[0]
  const args = [123]
  const gasPrice = (hre.network.name === 'mainnet') ? 17.01e9 : 1
  const gasLimit = 1e6
  const dr = await deploy(contractName, {
    from: deployer,
    contract: contractName,
    args: args,
    gasLimit: gasLimit,
    gasPrice: BigNumber.from(gasPrice),
    deterministicDeployment: false,
    log: true
  })
  if (dr.newlyDeployed) {
    console.log(`${contractName} deployed to ${dr.address}`)
  }
}

// hardhat-deploy plugin requires javascript code with:
//   - module.exports is the deploy() function
//   - module.exports.dependencies is the array of dependencies required by this deployment
//   - module.exports.tags is the array of tags provided by this deployment
deploy.dependencies = [] as string[]
deploy.tags = [contractName]

export default deploy
