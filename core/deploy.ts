import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'

import compiledFactory from '@/core/build/contracts/CampaignFactory.json'

const provider = new HDWalletProvider(
  process.env.ACCT_MNEMONIC,
  process.env.NETWORK_ENDPOINT
)

const web3 = new Web3(provider)

async function deploy() {
  const [account] = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', account)
  const contract = new web3.eth.Contract(
    compiledFactory.abi as AbiItem[]
  )
  const deployedContract = contract.deploy({
    data: compiledFactory.bytecode
  })
  const result = await deployedContract.send({
    gas: 1e6,
    gasPrice: 5e9.toString(),
    from: account
  })
  console.log('Contract deployed to', result.options.address)
}

deploy()