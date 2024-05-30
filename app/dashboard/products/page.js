'use client'

import { Box } from "@mui/material"
import FormProduct from "../../../src/components/FormProduct"
import { usePresentations, useBrands, useUnits } from "@/src/hooks/FetchItems"
import { useProducts } from "@/src/hooks/useProducts"
import FormEditProduct from '../../../src/components/EditProduct'
import AlertDialog from '../../../src/Layout/AlertDialog'
import { useState } from "react"

const ProductsMenu = () => {
    const { products } = useProducts()
    const { presentations } = usePresentations()
    const { brands } = useBrands()
    const { units } = useUnits()
    const [open, setOpen] = useState(false)
    const [rowProduct, setRowProduct] = useState()

    const handleOpen = (rowId) => {
        setOpen(true)
        setRowProduct(rowId)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <FormProduct 
                products={products}
                presentations={presentations}
                brands={brands}
                units={units}
                handleClickOpen={handleOpen}
            />
            <AlertDialog
                title='Edit product'
                open={open}
                handleClose={handleClose}
            >
                <FormEditProduct 
                    rowProduct={rowProduct}
                    handleClose={handleClose}
                    presentations={presentations}
                    brands={brands}
                    units={units}
                />
            </AlertDialog>
        </Box>
    )
}

export default ProductsMenu