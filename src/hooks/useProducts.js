'use client'

import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import handleItemReader from "../service/frontend/itemReaderServiceHandler"
import { useUserContext } from "../context/userContext"

export const useProducts = () => {
    const userData = useUserContext();
    const { enqueueSnackbar } = useSnackbar()
    const [products, setProducts] = useState([]);

    const getProduct = async (barcode) => {
        try {
            const data = await handleItemReader({ table: 'Product', rule: {condition: "barcode", conditionValue: barcode}, userId: userData.id });
            return data;
        } catch (error) {
            setProducts([]);
            enqueueSnackbar(error.message, { variant: 'error' });
        };
    };

    const handleUpdateProducts = async () => {
        try {
            const data = await handleItemReader({ table: 'Product', rule: {condition: "visible", conditionValue:true}, userId: userData.id });
            setProducts(data);
        } catch (error) {
            setProducts([]);
            enqueueSnackbar(error.message, { variant: 'error' });
        };
    };

    useEffect(() => {
        if(userData){
            handleUpdateProducts();
        };
    }, [userData, products]);

    return { products, getProduct, handleUpdateProducts };
};