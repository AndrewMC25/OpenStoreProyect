import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import handleItemReader from "../service/frontend/itemReaderServiceHandler"

export const useProducts = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)

    const getProduct = async (barcode) => {
        setLoading(true)
        const data = await handleItemReader({table: 'Product', rule: {condition: "barcode", conditionValue: barcode}})
        setLoading(false)

        return data;
    }

    useEffect(() => {
        setLoading(true)
        const fetchItems = async () => {
            try {
                const data = await handleItemReader({table: 'Product', rule: {condition: "visible", conditionValue:true}});
                setProducts(data);
            } catch (error) {
                setProducts(null);
                enqueueSnackbar(error.message, { variant: 'error' });
            }
        }
        fetchItems()
        setLoading(false)
    }, [])

    return { products, loading, getProduct }
}