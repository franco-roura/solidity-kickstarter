import { Alert, AlertColor, Box, Button, CircularProgress, InputAdornment, Snackbar, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Router from 'next/router'
import React, { useMemo, useState } from 'react'
import * as yup from 'yup'

import Campaign from '@/interfaces/campaign'
import web3 from '@/interfaces/web3'

const minAmount = parseFloat(web3.utils.fromWei('100', 'ether'))

const validationSchema = yup.object({
  contributionAmount: yup.number().required().positive('It needs to be a positive number').min(minAmount)
})

interface Props {
  campaignAddress: string
}

const ContributeForm = (props: Props) => {
  const [feedbackMessage, setFeedbackMessage] = useState('Your contribution has been sent!')
  const [feedbackType, setFeedbackType] = useState<AlertColor>('success')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const campaign = useMemo(() => Campaign(props.campaignAddress), [props.campaignAddress])

  const formik = useFormik({
    initialValues: {
      contributionAmount: 0.031,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const [account] = await web3.eth.getAccounts()
        const ethAmount = web3.utils.toWei(values.contributionAmount.toString(), 'ether')
        await campaign.methods.contribute().send({
          from: account,
          value: ethAmount
        })
        setFeedbackMessage('Your contribution has been sent!')
        setFeedbackType('success')
        setTimeout(() => Router.reload(), 300)
      } catch (error: any) {
        setFeedbackMessage(error.message ?? 'Something went wrong')
        setFeedbackType('error')
      } finally {
        setOpenSnackbar(true)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" paddingX={3} paddingBottom={3}>Add a contribution</Typography>
      <Box paddingX={3}>
        <Typography variant="body1" marginBottom={2}>
          Select an amount to contribute to this campaign.
        </Typography>
        <TextField
          autoFocus
          name="contributionAmount"
          label="Contribution amount"
          InputProps={{
            endAdornment: <InputAdornment position="end">ETH</InputAdornment>
          }}
          value={formik.values.contributionAmount}
          onChange={formik.handleChange}
          error={formik.touched.contributionAmount && Boolean(formik.errors.contributionAmount)}
          helperText={formik.touched.contributionAmount && formik.errors.contributionAmount}
          fullWidth
        />
      </Box>
      <Box padding={3} display="flex" justifyContent="flex-end">
        {formik.isSubmitting
          ? <CircularProgress />
          : <Button fullWidth type="submit" variant="contained">Contribute!</Button>
        }
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={feedbackType}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </form>
  )
}

export default ContributeForm
