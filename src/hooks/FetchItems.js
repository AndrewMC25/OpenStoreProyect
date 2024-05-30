import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import handleItemReader from "../service/frontend/itemReaderServiceHandler"
import { useUserContext } from "../context/userContext"

const isVisible = {condition: "visible", conditionValue:true}

export const useBrands = () => {
    const userData = useUserContext();
    const { enqueueSnackbar } = useSnackbar();
    const [brands, setBrands] = useState([]);

    const handleUpdateBrands = async () => {
        try {
            const data = await handleItemReader({ table: 'Brand', rule: isVisible, userId: userData.id });
            setBrands(data);
        } catch (error) {
            setBrands([]);
            enqueueSnackbar(error.message, { variant: 'error' });
        };
    };

    useEffect(() => {
        if(userData){
            handleUpdateBrands();
        };
    }, [ userData, brands ]);

    return { brands, handleUpdateBrands };
};

export const usePresentations = () => {
    const userData = useUserContext();
    const { enqueueSnackbar } = useSnackbar();
    const [presentations, setPresentations] = useState([]);

    const handleUpdatePresentations = async () => {
        try {
            const data = await handleItemReader({ table: 'ProductPresentation', rule: isVisible, userId: userData.id });
            setPresentations(data);
        } catch (error) {
            setPresentations([]);
            enqueueSnackbar(error.message, { variant: 'error' });
        };
    };

    useEffect(() => {
        if(userData){
            handleUpdatePresentations();
        };
    }, [ userData, presentations ]);

    return { presentations, handleUpdatePresentations };
}

export const useUnits = () => {
    const userData = useUserContext();
    const { enqueueSnackbar } = useSnackbar();
    const [units, setUnits] = useState([]);

    const handleUpdateUnits = async () => {
        try {
            const data = await handleItemReader({ table: 'UnitType', rule: isVisible, userId: userData.id });
            setUnits(data);
        } catch (error) {
            setUnits([]);
            enqueueSnackbar(error.message, { variant: 'error' });
        };
    };

    useEffect(() => {
        if(userData){
            handleUpdateUnits();
        };
    }, [ userData, units ]);

    return { units, handleUpdateUnits };
}