import { LoadingButton } from "@mui/lab"
import { Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useState } from "react"
import * as Yup from "yup"

const EditCartProducts = ({ handleClose, setNewAmount}) => {
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const formSchema = Yup.object().shape({
        amount: Yup
            .number()
            .required('Este campo es obligatorio')
    })

    const formik = useFormik({
        initialValues: {
            amount: ''
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                enqueueSnackbar('successfully edit!', { variant: 'success' })
                setNewAmount(values.amount)
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            handleClose()
        },
        validationSchema: formSchema
    })

    return (
        <div>
            <Stack
                sx={{
                    alignItems: 'center',
                }}
            >
                <Stack
                    sx={{
                        width: '500px',
                        border: '1px solid #d3d3d3',
                        padding: 5,
                        borderRadius: 5,
                        margin: '0px 0px 32px 0px'
                    }}
                >
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            label="amount"
                            variant="outlined"
                            name="amount"
                            sx={{
                                width: '80%'
                            }}
                            autoFocus
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}
                            error={!!formik.errors.amount}
                            helperText={formik.errors.amount}
                        />
                        <br />
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '80%'
                            }}
                        >
                            Edit
                        </LoadingButton>
                    </form>
                </Stack>
            </Stack>
        </div>
    )
}


export default EditCartProducts