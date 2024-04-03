'use client'

import { Box } from "@mui/material"
import FormBrand from "../../src/components/FormBrand"
import FetchAllBrands from '../../src/hooks/Fetchers/FetchAllBrands'
import SimpleBackdrop from '../../src/Layout/Backdrop'
import FormEditBrand from '../../src/utils/EditBrand'
import AlertDialog from '../../src/Layout/AlertDialog'
import { useState } from "react"

const BrandsMenu = () => {
    const [updateDOM, setUpdateDOM] = useState()
    const { brands, loading } = FetchAllBrands(updateDOM)
    const [open, setOpen] = useState(false)
    const [rowBrand, setRowBrand] = useState()

    const handleOpen = (rowId) => {
        setOpen(true)
        setRowBrand(rowId)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <FormBrand brands={brands} handleClickOpen={handleOpen} />
            <AlertDialog
                title='Edit Brand'
                open={open}
                handleClose={handleClose}
            >
                <FormEditBrand rowBrand={rowBrand} handleClose={handleClose} setUpdateDOM={setUpdateDOM} />
            </AlertDialog>
            {loading && <SimpleBackdrop open={true}/>}
        </Box>
    )
}

export default BrandsMenu