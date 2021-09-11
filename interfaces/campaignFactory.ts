import web3 from 'interfaces/web3'
import CampaignFactory from 'core/build/CampaignFactory.json'
import type { FactoryContract } from 'types/app-env'

export const campaignFactory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    process.env.CONTRACT_ADDRESS
) as unknown as FactoryContract

export default campaignFactory