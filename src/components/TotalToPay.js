import { Box, FormControlLabel, Checkbox, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import stockControl from '../service/frontend/stockControlService'
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useUserContext } from "../context/userContext";

const styles = {
    detallesCarro: {
      width: "100%",
    },
    ul: {
      margin: "0",
      padding: "0",
      width: '100%'
    },
    producto: {
      listStyleType: "none",
      display: "grid",
      gridColumnGap: '12px',
      gridTemplateAreas:`'head price' 'tail price'`,
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '1fr minmax(13ch, 20%)',
      margin: '0 0 12px'
    },
};

const TotalToPay = ({ cart, setCart, subtotal, handleClose }) => {
    const user = useUserContext();
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [delivery, setDelivery] = useState(false)
    const [deliveryValue, setDeliveryValue] = useState(0)
    const checkboxValue = () => {
        setDelivery(!delivery)
    }
    const totalValue = (parseInt(subtotal) + parseInt(deliveryValue))
    const opciones = { useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0 }
    return(
        <Stack
            alignItems='center'
            sx={{
                width: '500px',
                height: 'max-content',
                padding: '20px 20px 5px',
                border: '1px solid #d3d3d3',
                borderRadius: 1,
                margin: '0px 32px 0px 32px',
                justifyContent: 'space-between',
                color: '#000'
            }}
        >
           <Stack style={styles.detallesCarro}>
                <Box
                    sx={{
                        borderBottom: '1px solid #DDD'
                    }}
                >
                    <div>
                        <Typography
                            variant="h4"
                            sx={{
                                height: '36px'
                            }}
                        >
                            Bill
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            sx={{
                                boxSizing: 'border-box',
                                fontSize: '0.9rem',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                height: '20px'
                            }}
                        >
                            Precio
                        </Typography>
                    </div>
                </Box>
            {cart.map((x) => (
                <Box
                    key={x.id}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '24px 0px 0px 0px',
                        borderBottom: '1px solid #DDD'
                    }}
                >
                    <ul style={styles.ul}>
                        <li style={styles.producto} key={x.barcode}>
                            <Typography
                                sx={{
                                    fontSize: '1.25rem',
                                    letterSpacing: '0.0075em',
                                }}
                            >
                                {x.name}
                            </Typography>
                            <div
                                style={{
                                    gridArea: 'price',
                                    display: 'flex',
                                    flexFlow: 'column',
                                    alignItems: 'end',
                                    textAlign: 'end',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    ${x.price.toLocaleString('es', opciones)}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    listStyle: 'none',
                                    gridArea: 'tail'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    cantidad: {x.amount.toLocaleString('es', opciones)}
                                </span>
                            </div>
                        </li>
                    </ul>
                </Box>
            ))}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '24px 0px 24px 0px',
                        borderBottom: '1px solid #DDD',
                        justifyContent: 'space-between'
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={checkboxValue}
                            />
                        }
                        label="Delivery"
                    />
                    {delivery && 
                        <TextField
                            label= 'Delivery Price'
                            type= "number"
                            autoFocus
                            onChange={event => (setDeliveryValue(event.target.value))}
                        />
                    }
                </Box>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '20px 0px 10px',
                        justifyContent: 'space-between',
                        alignItems: 'center'      
                    }}
                >
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        padding='6px'
                        onClick={
                            async () => {
                                setLoading(true);
                                await stockControl({ products: cart, user: user });
                                handleClose(false);
                                setCart([]);
                                enqueueSnackbar('Thanks for your purchase!!', { variant: 'success' });
                                setLoading(false);
                            }
                        }
                    >
                        <DoneOutlineIcon />
                    </LoadingButton>
                    <Box
                        display='flex'
                        flexDirection='row'
                    >
                        <Typography
                            sx={{
                                textRendering: 'optimizeLegibility',
                                fontSize: '18px',
                                lineHeight: '24px',
                                boxSizing: 'border-box',
                                textAlign: 'right',
                                margin: '0px 8px 0px 0px'
                            }}
                        >
                            Total:
                        </Typography>
                        <Typography
                            sx={{
                                textRendering: 'optimizeLegibility',
                                whiteSpace: 'nowrap',
                                fontSize: '18px',
                                lineHeight: '24px',
                                boxSizing: 'border-box',
                                textAlign: 'right',
                                fontWeight: 700
                            }}
                        >
                            ${totalValue.toLocaleString('es', opciones)}
                        </Typography>
                    </Box>
                </Box>
            </Stack> 
        </Stack>
    )
}

export default TotalToPay