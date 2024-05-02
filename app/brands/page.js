'use client'

import { Box } from "@mui/material"
import FormBrand from "../../src/components/FormBrand"
import SimpleBackdrop from '../../src/Layout/Backdrop'
import FormEditBrand from '../../src/components/EditBrand'
import AlertDialog from '../../src/Layout/AlertDialog'
import { useState } from "react"
import { useBrands } from "@/src/hooks/FetchItems"

const BrandsMenu = () => {
    const { brands, loading } = useBrands()
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
            <FormBrand brands={brands} handleClickOpen={handleOpen} isTableVisible={true} />
            <AlertDialog
                title='Edit Brand'
                open={open}
                handleClose={handleClose}
            >
                <FormEditBrand rowBrand={rowBrand} handleClose={handleClose} />
            </AlertDialog>
            {loading && <SimpleBackdrop open={true}/>}
        </Box>
    )
}

export default BrandsMenu