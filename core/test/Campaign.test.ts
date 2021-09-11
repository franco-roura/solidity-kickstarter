import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'

import compiledCampaign from '@/core/build/contracts/Campaign.json'
import compiledFactory from '@/core/build/contracts/CampaignFactory.json'
import { CampaignContract, FactoryContract } from '@/types/app-env'

const eth100 = parseInt(Web3.utils.toWei('100', 'ether')).toString(16)
const initialBalance = `0x${eth100}`
const web3 = new Web3(ganache.provider({
  accounts: [1, 2, 3].map(() => ({ balance: initialBalance }))
}))

let accounts: string[]
let factory: FactoryContract
let campaign: CampaignContract
let campaignAddress: string

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(compiledFactory.abi as AbiItem[])
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: 5e6 }) as unknown as FactoryContract

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: 5e6
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call()

  campaign = new web3.eth.Contract(
    compiledCampaign.abi as AbiItem[],
    campaignAddress
  ) as unknown as CampaignContract
})

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('processes requests', async () => {
    const fromManager = {
      from: accounts[0],
      gas: 5e6
    }

    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })

    await campaign.methods.createRequest(
      'Request name',
      web3.utils.toWei('5', 'ether'),
      accounts[1]
    ).send(fromManager)

    await campaign.methods.approveRequest(0).send(fromManager)
    await campaign.methods.finalizeRequest(0).send(fromManager)
    let balance: number | string = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    assert.equal(balance, 105)
  })

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(manager, accounts[0])
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    })

    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: 5,
        from: accounts[1]
      })
    } catch (error) {
      assert(error)
      return
    }
    assert(false)
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('Request name', 100, accounts[2])
      .send({
        from: accounts[0],
        gas: 5e6
      })
    const request = await campaign.methods.requests(0).call()
    assert.equal(request.description, 'Request name')
    assert.equal(request.value, 100)
    assert.equal(request.recipient, accounts[2])
    assert(!request.complete)
  })
})
