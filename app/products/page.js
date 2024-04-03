'use client'

import { Box } from "@mui/material"
import FormProduct from "../../src/components/FormProduct"
import FetchAllProducts from '../../src/hooks/Fetchers/FetchAllProducts'
import FetchAllPresentations from '../../src/hooks/Fetchers/FetchAllPresentations'
import FetchAllBrands from '../../src/hooks/Fetchers/FetchAllBrands'
import FetchAllUnits from '../../src/hooks/Fetchers/FetchAllUnits'
import SimpleBackdrop from '../../src/Layout/Backdrop'
import FormEditProduct from '../../src/utils/EditProduct'
import AlertDialog from '../../src/Layout/AlertDialog'
import { useState } from "react"

const ProductsMenu = () => {
    const [updateDOM, setUpdateDOM] = useState()
    const { products, loading } = FetchAllProducts(updateDOM)
    const { presentations } = FetchAllPresentations(updateDOM)
    const { brands } = FetchAllBrands(updateDOM)
    const { units } = FetchAllUnits(updateDOM)
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
                setUpdateDOM={setUpdateDOM}
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
                    setUpdateDOM={setUpdateDOM}
                />
            </AlertDialog>
            {loading && <SimpleBackdrop open={true}/>}
        </Box>
    )
}

export default ProductsMenu