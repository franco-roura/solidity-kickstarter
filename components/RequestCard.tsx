import { mdiEthereum } from '@mdi/js'
import { mdiAccountMultipleCheck } from '@mdi/js'
import Icon from '@mdi/react'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Paper, Typography } from '@mui/material'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

import Campaign from '@/interfaces/campaign'
import web3 from '@/interfaces/web3'
import { Request } from '@/types/app-env'

interface Props {
  campaignAddress: string
  campaignManager: string
  neededApprovals: number
  request: Request
}

const RequestCard = (props: Props) => {
  const [loadingApproval, setLoadingApproval] = useState(false)
  const [loadingFinalize, setLoadingFinalize] = useState(false)
  const [userAccount, setUserAccount] = useState('')
  const userIsManager = userAccount === props.campaignManager
  const approved = props.request.approvalCount > (props.neededApprovals / 2)

  useEffect(() => {
    web3.eth.getAccounts().then(([account]) => setUserAccount(account))
  })

  const handleApproveRequest = async () => {
    try {

      setLoadingApproval(true)
      const campaign = Campaign(props.campaignAddress)
      await campaign.methods.approveRequest(props.request.id).send({
        from: userAccount
      })
      setLoadingApproval(false)
      setTimeout(() => router.reload(), 300)
    } catch (error) {
      setLoadingApproval(false)
    }
  }
  const handleFinalizeRequest = async () => {
    try {

      setLoadingFinalize(true)
      const campaign = Campaign(props.campaignAddress)
      await campaign.methods.finalizeRequest(props.request.id).send({
        from: userAccount
      })
      setLoadingFinalize(false)
      setTimeout(() => router.reload(), 300)
    } catch (error) {
      setLoadingFinalize(false)
    }
  }
  return (
    <Paper key={props.request.id} sx={{ padding: 3, width: '100%', flexGrow: 1, marginBottom: 3 }} elevation={3}>
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="h5">
            {props.request.description}
          </Typography>
          <Typography variant="body2" noWrap>
            To provider {props.request.recipient}
          </Typography>
          <Box marginTop={1}>
            {userIsManager && (
              <LoadingButton loading={loadingFinalize} onClick={handleFinalizeRequest} disabled={!approved} sx={{ marginRight: 1 }} variant="outlined">
                Finalize
              </LoadingButton>
            )}
            <LoadingButton loading={loadingApproval} onClick={handleApproveRequest} variant="outlined">Approve</LoadingButton>
          </Box>
        </Grid>
        <Grid item xs={2} alignSelf="center">
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-end'
            }}>
            {props.request.approvalCount}/{props.neededApprovals}
            <Icon path={mdiAccountMultipleCheck} title="ETH" size={1.16} />
          </Typography>
        </Grid>
        <Grid item xs={3} alignSelf="center">
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-end'
            }}>
            {props.request.valueInEth} ETH
            <Icon path={mdiEthereum} title="ETH" size={1.16} />
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default RequestCard
