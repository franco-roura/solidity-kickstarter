import compiledFactory from 'core/build/CampaignFactory.json'
import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

const provider = new HDWalletProvider(
  process.env.ACCT_MNEUMONIC,
  process.env.NETWORK_ENDPOINT
)

const web3 = new Web3(provider)

async function deploy() {
  const [account] = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', account)
  const contract = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
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