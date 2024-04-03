'use client'

import { Box } from "@mui/material"
import FormUnit from "../../src/components/FormUnit"
import FetchAllUnits from '../../src/hooks/Fetchers/FetchAllUnits'
import SimpleBackdrop from '../../src/Layout/Backdrop'
import FormEditUnit from '../../src/utils/EditUnit'
import AlertDialog from '../../src/Layout/AlertDialog'
import { useState } from "react"

const UnitsMenu = () => {
    const { units, loading } = FetchAllUnits()
    const [open, setOpen] = useState(false)
    const [rowUnit, setRowUnit] = useState()

    const handleOpen = (rowId) => {
        setOpen(true)
        setRowUnit(rowId)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <FormUnit units={units} handleClickOpen={handleOpen} />
            <AlertDialog
                title='Edit Unit'
                open={open}
                handleClose={handleClose}
            >
                <FormEditUnit rowUnit={rowUnit} handleClose={handleClose} />
            </AlertDialog>
            {loading && <SimpleBackdrop open={true}/>}
        </Box>
    )
}

export default UnitsMenu