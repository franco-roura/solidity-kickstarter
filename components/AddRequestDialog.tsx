import { Alert, AlertColor, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Snackbar } from '@mui/material'
import { useFormik } from 'formik'
import Router from 'next/router'
import React, { useMemo, useState } from 'react'
import * as yup from 'yup'

import FormField from '@/components/FormField'
import Campaign from '@/interfaces/campaign'
import web3 from '@/interfaces/web3'

const validationSchema = yup.object({
  description: yup.string().required('A description for the request is required.'),
  value: yup.number().positive('It needs to be a positive number').required('You need to specify the amount you\'re requesting to extract.'),
  recipient: yup.string().required('A recipient for the request is required.').matches(/^0x[a-fA-F0-9]{40}$/, 'The recipient needs to be a valid ethereum address.'),
})

interface Props {
  campaignAddress: string
}

const AddRequestDialog = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('Your campaign has been created!')
  const [feedbackType, setFeedbackType] = useState<AlertColor>('success')
  const campaign = useMemo(() => Campaign(props.campaignAddress), [props.campaignAddress])
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseSnackbar = () => setOpenSnackbar(false)
  const handleCloseDialog = () => {
    setOpenDialog(false)
    formik.resetForm()
  }
  const handleCloseDialogAttempt = () => {
    if (!formik.isSubmitting) handleCloseDialog()
  }

  const formik = useFormik({
    initialValues: {
      description: '',
      value: 0,
      recipient: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const [account] = await web3.eth.getAccounts()
        const amountInWei = web3.utils.toWei(values.value.toString(), 'ether')
        await campaign.methods.createRequest(values.description, amountInWei, values.recipient).send({
          from: account
        })
        setFeedbackMessage('Your request has been created!')
        setFeedbackType('success')
        handleCloseDialog()
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
    <div>
      <Button variant="contained" fullWidth onClick={handleOpenDialog}>
        Create new request
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialogAttempt} aria-labelledby="form-dialog-title">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create new request</DialogTitle>
          <DialogContent>
            <DialogContentText marginBottom={2}>
              Tell your investors and supporters how you&apos;re planning to use this campaign&apos;s ETH.
            </DialogContentText>
            <FormField formik={formik} name="description" fullWidth margin="normal" label="Request description" />
            <FormField formik={formik} name="recipient" fullWidth margin="normal" label="Recipient" />
            <FormField
              formik={formik}
              name="value"
              fullWidth
              margin="normal"
              label="Amount to request"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">ETH</InputAdornment>
              }}
            />
          </DialogContent>
          <DialogActions>
            {formik.isSubmitting
              ? <CircularProgress />
              : (
                <>
                  <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Create!
                  </Button>
                </>
              )}
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={feedbackType}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AddRequestDialog
