'use client'

import { Box } from "@mui/material"
import FormPresentation from "../../../src/components/FormPresentation"
import { usePresentations } from "@/src/hooks/FetchItems"
import SimpleBackdrop from '../../../src/Layout/Backdrop'
import FormEditPresentation from '../../../src/components/EditPresentation'
import AlertDialog from '../../../src/Layout/AlertDialog'
import { useState } from "react"

const PresentationsMenu = () => {
    const { presentations, loading } = usePresentations()
    const [open, setOpen] = useState(false)
    const [rowPresentation, setRowPresentation] = useState()

    const handleOpen = (rowId) => {
        setOpen(true)
        setRowPresentation(rowId)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Box>
            <FormPresentation presentations={presentations} handleClickOpen={handleOpen} isTableVisible={true} />
            <AlertDialog
                title='Edit presentation'
                open={open}
                handleClose={handleClose}
            >
                <FormEditPresentation rowPresentation={rowPresentation} handleClose={handleClose} />
            </AlertDialog>
            {loading && <SimpleBackdrop open={true}/>}
        </Box>
    )
}

export default PresentationsMenu