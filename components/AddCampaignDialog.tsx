import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Snackbar, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'

import campaignFactory from '@/interfaces/campaignFactory'
import web3 from '@/interfaces/web3'

const validationSchema = yup.object({
  minimumContribution: yup.number().positive('It needs to be a positive number').required('A minimum contribution amount is required'),
})

interface Props {
  onCampaignCreated(): void
}

const AddCampaignDialog = (props: Props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('Your campaign has been created!')
  const [feedbackType, setFeedbackType] = useState<'error' | 'success'>('success')
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseSnackbar = () => setOpenSnackbar(false)
  const handleCloseDialog = () => {
    if (!loading) setOpenDialog(false)
  }

  const formik = useFormik({
    initialValues: {
      minimumContribution: 2,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const [account] = await web3.eth.getAccounts()
        await campaignFactory.methods.createCampaign(values.minimumContribution).send({
          from: account
        })
        setFeedbackMessage('Your campaign has been created!')
        setFeedbackType('success')
        handleCloseDialog()
        props.onCampaignCreated()
      } catch (error: any) {
        setFeedbackMessage(error.message ?? 'Something went wrong')
        setFeedbackType('error')
      } finally {
        setOpenSnackbar(true)
        setLoading(false)
      }
    },
  })
  return (
    <div>
      <Button variant="contained" color="secondary" fullWidth onClick={handleOpenDialog}>
        Create new campaign
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create new campaign</DialogTitle>
          <DialogContent>
            <DialogContentText marginBottom={2}>
              To create your new fund raising campaign, first select a minimum contribution amount.
            </DialogContentText>
            <TextField
              autoFocus
              name="minimumContribution"
              label="Minimum contribution"
              InputProps={{
                endAdornment: <InputAdornment position="end">wei</InputAdornment>
              }}
              value={formik.values.minimumContribution}
              onChange={formik.handleChange}
              error={formik.touched.minimumContribution && Boolean(formik.errors.minimumContribution)}
              helperText={formik.touched.minimumContribution && formik.errors.minimumContribution}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {loading
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

export default AddCampaignDialog
