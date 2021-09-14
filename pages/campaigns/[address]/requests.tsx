import { Grid, Typography } from '@mui/material'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import AddRequestDialog from '@/components/AddRequestDialog'
import Layout from '@/components/Layout'
import RequestCard from '@/components/RequestCard'
import Campaign from '@/interfaces/campaign'
import web3 from '@/interfaces/web3'
import { Request } from '@/types/app-env'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const campaignAddress = context.params?.address as string
  const campaign = Campaign(campaignAddress)
  const requestCount = await campaign.methods.getRequestsCount().call()
  const neededApprovals = await campaign.methods.approversCount().call()
  const campaignManager = await campaign.methods.manager().call()
  const requests: Array<Request> = []
  await Promise.all(Array.from(Array(parseInt(requestCount)).keys()).map(async (index) => {
    const { description, value, recipient, complete, approvalCount } = await campaign.methods.requests(index).call()
    const valueInEth = web3.utils.fromWei(value, 'ether')
    if (!complete) requests.push({ id: index, description, valueInEth, recipient, complete, approvalCount })
  }))
  return {
    props: {
      campaignAddress,
      requests,
      neededApprovals,
      campaignManager
    }
  }
}

const CampaignRequests = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const renderRequests = () => props.requests.map((request) => (
    <RequestCard
      key={request.id}
      campaignAddress={props.campaignAddress}
      campaignManager={props.campaignManager}
      neededApprovals={props.neededApprovals}
      request={request}
    />
  ))
  console.table(props.requests)
  return (
    <Layout>
      <Head>
        <title>Franco&apos;s Kickstarter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1" noWrap>
            Requests of campaign {props.campaignAddress}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          {renderRequests()}
        </Grid>
        <Grid item xs={12} lg={4}>
          <AddRequestDialog campaignAddress={props.campaignAddress} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default CampaignRequests
