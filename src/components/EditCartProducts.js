import { LoadingButton } from "@mui/lab"
import { Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useSnackbar } from "notistack"
import { useState } from "react"
import * as Yup from "yup"
import supabase from "../config/supabaseClient"
import FetchAllProducts from "../hooks/Fetchers/FetchAllProducts"

const EditCartProducts = ({ handleClose, id, amount, setNewAmount, updateDOM, setUpdateDOM }) => {
    const [loading, setLoading] = useState(false)
    const { products } = FetchAllProducts(updateDOM)
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (productAmount, saledAmount, productId) => {
        if (!productAmount) {
            throw new Error('Error, set corret data')
        }
        const findProduct = products.find((item) => item.id === productId )
        const amount = findProduct.amount + (saledAmount - productAmount)
        const { error } = await supabase
            .from('Product')
            .update([{ amount }])
            .eq('id', productId)
            .select()
        if (error) {
            throw new Error(error)
        }
        setUpdateDOM(1)
    }

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
                await handleSubmit(values.amount, amount, id)
                enqueueSnackbar('successfully edit!', { variant: 'success' })
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            setNewAmount(values.amount)
            handleClose()
        },
        validationSchema: formSchema
    })
    return(
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
                        error={formik.errors.amount}
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
    )
}

export default EditCartProducts