import CampaignFactory from 'core/build/CampaignFactory.json'
import web3 from 'interfaces/web3'
import type { FactoryContract } from 'types/app-env'

console.log(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

const campaignFactory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
) as unknown as FactoryContract

export default campaignFactory