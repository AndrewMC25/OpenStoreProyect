import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'

const FetchHiddenUnits = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [hiddenUnits, setHiddenUnits] = useState([])
    const [hiddenUnitsError, setHiddenUnitsError] = useState(null)

    useEffect(() => {
        const fecthUnits = async () => {
            const { data, error } = await supabase
                .from('UnitType')
                .select()
                .is('visible', false)

            if (error) {
                setHiddenUnitsError(error.message)
                setHiddenUnits(null)
                enqueueSnackbar(hiddenUnitsError, { variant: 'error' })
            }
            if (data) {
                setHiddenUnits(data)
                setHiddenUnitsError(null)
            }
        }
        fecthUnits()
    }, [])

    return hiddenUnits
}

export default FetchHiddenUnits