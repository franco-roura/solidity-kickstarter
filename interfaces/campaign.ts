import type { AbiItem } from 'web3-utils'

import builtCampaign from '@/core/build/contracts/Campaign.json'
import web3 from '@/interfaces/web3'
import type { CampaignContract } from '@/types/app-env'

const Campaign = (campaignAddress: string) => new web3.eth.Contract(
  builtCampaign.abi as AbiItem[],
  campaignAddress
) as unknown as CampaignContract

export default Campaign