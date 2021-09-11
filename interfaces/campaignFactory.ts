import type { AbiItem } from 'web3-utils'

import CampaignFactory from '@/core/build/contracts/CampaignFactory.json'
import web3 from '@/interfaces/web3'
import type { FactoryContract } from '@/types/app-env'

const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi as AbiItem[],
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
) as unknown as FactoryContract

export default campaignFactory