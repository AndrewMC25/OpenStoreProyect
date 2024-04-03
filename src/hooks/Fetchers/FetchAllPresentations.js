import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'
import { useSnackbar } from "notistack"

const FetchAllPresentations = ( updateDOM ) => {
    const { enqueueSnackbar } = useSnackbar()

    const [presentations, setPresentations] = useState(null)
    const [presentationsError, setPresentationsError] = useState(null)
    const [loading, setLoading] =useState(false)

    useEffect(() => {
        setLoading(true)
        const fecthPresentations = async () => {
            const { data, error } = await supabase
                .from('ProductPresentation')
                .select()
                .is('visible', true)

            if (error) {
                setPresentationsError(error.message)
                setPresentations(null)
                enqueueSnackbar(presentationsError, { variant: 'error' })
            }
            if (data) {
                setPresentations(data)
                setPresentationsError(null)
            }
        }
        fecthPresentations()
        setLoading(false)
    }, [ updateDOM ])

    return { presentations, loading }
}

export default FetchAllPresentations