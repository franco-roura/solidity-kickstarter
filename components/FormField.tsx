import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

import { FormikObj } from '@/types/app-env'

type Props<T extends Record<string, string | number>> = {
  formik: FormikObj<T>
  name: keyof T
} & TextFieldProps

const FormField = <T extends Record<string, string | number>>(props: Props<T>) => {
  const { formik, name, ...otherProps } = props
  return (
    <TextField
      {...otherProps}
      {...formik.getFieldProps(name)}
      error={props.formik.touched[props.name] && Boolean(props.formik.errors[props.name])}
      helperText={props.formik.touched[props.name] && props.formik.errors[props.name]}
    />
  )
}

export default FormField
