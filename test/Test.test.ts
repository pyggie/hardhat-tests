import * as hre from 'hardhat'
import { expect, use } from 'chai'
import { solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'

use(solidity)

describe('deploy', () => {
  it('deploy', async () => {
    const factory = await hre.ethers.getContractFactory('Test')
    const contract = await factory.deploy(123)
    await contract.deployed()
    expect(await contract.x()).equal(123)
  })
})

