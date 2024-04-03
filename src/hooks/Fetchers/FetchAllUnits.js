import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'
import { useSnackbar } from "notistack"

const FetchAllUnits = ( updateDOM ) => {
    const { enqueueSnackbar } = useSnackbar()

    const [units, setUnits] = useState(null)
    const [unitsError, setUnitsError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fecthUnits = async () => {
            const { data, error } = await supabase
                .from('UnitType')
                .select()
                .is('visible', true)

            if (error) {
                setUnitsError(error.message)
                setUnits(null)
                enqueueSnackbar(unitsError, { variant: 'error' })
            }
            if (data) {
                setUnits(data)
                setUnitsError(null)
            }
        }
        fecthUnits()
        setLoading(false)
    }, [ updateDOM ])

    return { units, loading }
}

export default FetchAllUnits