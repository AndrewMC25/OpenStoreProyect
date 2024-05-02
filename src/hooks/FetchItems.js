import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import handleItemReader from "../service/frontend/itemReaderServiceHandler"

const isVisible = {condition: "visible", conditionValue:true}
const notVisible = {condition: "visible", conditionValue:false}

export const useBrands = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [brands, setBrands] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchItems = async () => {
            try {
                const data = await handleItemReader({table: 'Brand', rule: isVisible});
                setBrands(data);
            } catch (error) {
                setBrands(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchItems()
        setLoading(false)
    }, [])

    return {brands, loading}
}

export const usePresentations = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [presentations, setPresentations] = useState(null)
    const [loading, setLoading] =useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchItems = async () => {
            try {
                const data = await handleItemReader({table: 'ProductPresentation', rule: isVisible});
                setPresentations(data);
            } catch (error) {
                setPresentations(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchItems()
        setLoading(false)
    }, [])

    return { presentations, loading }
}

export const useUnits = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [units, setUnits] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchItems = async () => {
            try {
                const data = await handleItemReader({table: 'UnitType', rule: isVisible});
                setUnits(data);
            } catch (error) {
                setUnits(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchItems()
        setLoading(false)
    }, [])

    return { units, loading }
}

export const useHiddenBrands = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [hiddenBrands, setHiddenBrands] = useState([])
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await handleItemReader({table: 'Brand', rule: notVisible});
                setHiddenBrands(data);
            } catch (error) {
                setHiddenBrands(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchItems()
    }, [])

    return hiddenBrands
}

export const useHiddenPresentations = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [hiddenPresentation, setHiddenPresentation] = useState([])
    useEffect(() => {
        const fetchPresentation = async () => {
            try {
                const data = await handleItemReader({table: 'ProductPresentation', rule: notVisible});
                setHiddenPresentation(data);
            } catch (error) {
                setHiddenPresentation(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchPresentation()
    }, [])
    
    return hiddenPresentation
}

export const useHiddenProducts = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [hiddenProducts, setHiddenProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await handleItemReader({table: 'Product', rule: notVisible});
                setHiddenProducts(data);
            } catch (error) {
                setHiddenProducts(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchProducts()
    }, [])

    return hiddenProducts
}

export const useHiddenUnits = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [hiddenUnits, setHiddenUnits] = useState([])
    useEffect(() => {
        const fecthUnits = async () => {
            try {
                const data = await handleItemReader({table: 'UnitType', rule: notVisible});
                setHiddenUnits(data);
            } catch (error) {
                setHiddenUnits(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fecthUnits()
    }, [])

    return hiddenUnits
}