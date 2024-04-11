'use client'

import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup"
import { Stack, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import SalesFunction from '../hooks/Fetchers/SalesFunction'
import { DebounceInput } from "react-debounce-input";
import FetchAllProducts from '../hooks/Fetchers/FetchAllProducts'
import ProductCard from '../Layout/ProductCard'
import ShoppingCart from "../Layout/ShoppingCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SalesPanel = () => {

    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [subtotal, setSubtotal] = useState([])
    const [updateDOM, setUpdateDOM] = useState()
    const { enqueueSnackbar } = useSnackbar()

    const { products } = FetchAllProducts(updateDOM)
    const amountRef = useRef(null)

    const handleReset = () => {
        formik.resetForm();
    };

    const handleSubtotal = (newCart) => {
        const initialValue = 0
        const newSubtotal = newCart.map((x) => (x.amount * x.price))
        const subtotalSum = newSubtotal.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );
        setSubtotal(subtotalSum)
    }

    const handleCarroProducts = (cartProduct, amount) => {
        const cart = cartProducts.find((item) => item.barcode == cartProduct[0].barcode)
        let newCart

        if(cart) {
            newCart = cartProducts.map((x) =>
                x.barcode == cartProduct[0].barcode ? { ...x, amount: x.amount + initialValue } : x
            )
        } else {
            newCart = cartProducts.concat({
                ...cartProduct[0],
                amount: amount,
            })
        }
        setCartProducts(newCart)
        handleSubtotal(newCart)
        setSelectedProduct([])
    }

    const inputOnChange = (name, value) => {

        const numericValue = parseInt(value, 10)
        const foundProduct = products.find((item) => item.barcode === numericValue)

        if(foundProduct !== undefined) {
            setSelectedProduct([foundProduct])
            amountRef.current.focus()
        } else {
            enqueueSnackbar("Couldn't be found any product", { variant: 'error' })
        }
        formik.setFieldValue(name, value)
    }

    const formSchema = Yup.object().shape({
        barcode: Yup
            .number()
            .required('Este campo es obligatorio'),
        amount: Yup
            .number()
            .required('Este campo es obligatorio')
    })

    const formik = useFormik({
        initialValues: {
            barcode: '',
            amount: '',
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                await SalesFunction(values.barcode, values.amount, selectedProduct)
                enqueueSnackbar('successfully edit!', { variant: 'success' })
                handleCarroProducts(selectedProduct, values.amount)
                setUpdateDOM(11)
            } catch (error) {
                enqueueSnackbar(error, { variant: 'error' })
            }
            setLoading(false)
            handleReset()
            const barcodeRef = document.getElementById("barcode-field")
            barcodeRef.focus()
        },
        validationSchema: formSchema
    })

    return(
        <Stack
            flexDirection='row'
            justifyContent='center'
        >
            <Stack>
                <Stack
                    justifyContent='center'
                    sx={{
                        width: '500px',
                        border: '1px solid #d3d3d3',
                        padding: 5,
                        borderRadius: 5,
                        margin: '0px 32px 16px 32px',
                        alignItems: 'center'
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
                        <Typography variant="h5" >Sales Panel</Typography>
                        <br />
                        <TextField
                            name="barcode"
                            // minLength={2}
                            // debounceTimeout={1000}
                            value={formik.values.barcode}
                            onChange={e => inputOnChange('barcode', e.target.value)}
                            // element={TextField}
                            label="Barcode"
                            type="number"
                            id="barcode-field"
                            variant="outlined"
                            autoFocus
                            style={{
                                width: '100%',
                                margin: '8px 0px 0px 0px'
                            }}
                        />
                        <TextField
                            label="Amount"
                            variant="outlined"
                            type="number"
                            name="amount"
                            inputRef={amountRef}
                            sx={{
                                width: '100%',
                                margin: '8px 0px 0px 0px'
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}
                            error={formik.errors.amount}
                            helperText={formik.errors.amount}
                        />
                        <br/>
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            type="submit"
                            sx={{
                                width: '100%'
                            }}
                        >
                            discount
                        </LoadingButton>
                    </form>
                </Stack>
                <Stack
                    justifyContent='center'
                    sx={{
                        width: '500px',
                        border: '1px solid #d3d3d3',
                        padding: 3,
                        borderRadius: 5,
                        margin: '0px 32px 32px 32px',
                        alignItems: 'center'
                    }}
                >
                    {selectedProduct.length ? <ProductCard title='Product' products={selectedProduct}/> : 
                        <Typography
                            color='#8c8c8c'
                            variant='h5'
                        >
                            Scan the product
                        </Typography>
                    }
                </Stack>
            </Stack>
            <Stack
                alignItems='center'
                sx={{
                    width: '500px',
                    height: 'max-content',
                    padding: '20px 20px 5px',
                    border: '1px solid #d3d3d3',
                    borderRadius: 1,
                    margin: '0px 32px 32px 32px',
                    justifyContent: 'space-between'
                }}
            >
                {cartProducts.length
                ?
                    <ShoppingCart
                        handleSubtotal={handleSubtotal}
                        updateDOM={updateDOM}
                        setUpdateDOM={setUpdateDOM}
                        subtotal={subtotal}
                        cart={cartProducts}
                        setCart={setCartProducts}
                    />
                : 
                    <Stack
                        alignItems='center'
                    >
                        <Typography color='#8c8c8c' variant='h5' >
                            Add product
                        </Typography>
                        <br/>
                        <ShoppingCartIcon sx={{color: '#8c8c8c', margin: '0px 0px 16px'}} fontSize="large"/>
                    </Stack>
                }
            </Stack>
        </Stack>
    )
}

export default SalesPanel