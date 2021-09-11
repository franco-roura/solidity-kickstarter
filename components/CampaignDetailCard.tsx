import { Card, CardContent, Tooltip, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

interface Props {
  title: string
  value: string
  children: ReactNode
}

export const CampaignDetailCard = (props: Props) => {

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Tooltip title={props.value} aria-label={props.title} arrow>
          <Typography variant="h5" component="h2" noWrap>
            {props.value}
          </Typography>
        </Tooltip>
        <Typography variant="body2">
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CampaignDetailCard