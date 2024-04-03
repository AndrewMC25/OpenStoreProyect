import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import supabase from '../../config/supabaseClient'

const FetchHiddenPresentations = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [hiddenPresentation, setHiddenPresentation] = useState([])
    const [hiddenPresentationError, setHiddenPresentationError] = useState(null)

    useEffect(() => {
        const fetchPresentation = async () => {
            const { data, error } = await supabase
                .from('ProductPresentation')
                .select()
                .is('visible', false)

            if (error) {
                setHiddenPresentationError(error.message)
                setHiddenPresentation(null)
                enqueueSnackbar(hiddenPresentationError, { variant: 'error' })

            }
            if (data) {
                setHiddenPresentation(data)
                setHiddenPresentationError(null)
            }
        }

        fetchPresentation()
    }, [])
    
    return hiddenPresentation
}

export default FetchHiddenPresentations