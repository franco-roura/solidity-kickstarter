import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import AddCampaignDialog from '@/components/AddCampaignDialog'
import Layout from '@/components/Layout'
import campaignFactory from '@/interfaces/campaignFactory'

const fetchCampaigns = (): Promise<string[]> => campaignFactory.methods.getDeployedCampaigns().call()

export const getServerSideProps = async () => {
  const activeCampaigns = await fetchCampaigns()
  return {
    props: {
      activeCampaigns
    }
  }
}

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [activeCampaigns, setActiveCampaigns] = useState(props.activeCampaigns)
  const handleCampaignCreated = async () => setActiveCampaigns(await fetchCampaigns())

  const renderCampaigns = () => activeCampaigns.map((campaignAddress, index) => (
    <Box key={campaignAddress} marginBottom={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Campaign {index + 1}
          </Typography>
          <Typography variant="body1">At address {campaignAddress}</Typography>
        </CardContent>
        <CardActions>
          <Link href={`/campaigns/${campaignAddress}`} passHref>
            <Button size="small">View Campaign</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  ))

  return (
    <Layout>
      <Head>
        <title>Franco&apos;s Kickstarter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h6">Open campaigns</Typography>
          {renderCampaigns()}
        </Grid>
        <Grid item xs={4} mt={5} >
          <AddCampaignDialog onCampaignCreated={handleCampaignCreated} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
