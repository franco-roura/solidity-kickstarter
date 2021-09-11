import { Card, CardContent, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  title: string
  value: string
  children: ReactNode
}

export const CampaignDetailCard = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="h2" noWrap>
          {props.value}
        </Typography>
        <Typography variant="body2">
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CampaignDetailCard