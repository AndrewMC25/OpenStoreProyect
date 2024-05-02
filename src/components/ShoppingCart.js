import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AlertDialog from "../Layout/AlertDialog";
import TotalToPay from './TotalToPay';
import EditCartProducts from './EditCartProducts'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

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

const ShoppingCart = ({ cart, subtotal, setCart, handleSubtotal }) => {
  const [productCartOptions, setProductCartOptions] = useState(false)
  const [productCartId, setProductCartId] = useState()
  const [newAmount, setNewAmount] = useState()
  const [bill, setBill] = useState(false)

  const handleOpenProductOptions = (id) => {
    setProductCartOptions(true)
    setProductCartId(id)
  }
  const handleCloseProductOptions = () => {
    setProductCartOptions(false)
  }
  const handleDelete = (id) => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
    handleCloseProductOptions()
  }
  const handleOpenBill = () => {
    setBill(true)
  }
  const handleCloseBill = () => {
    setBill(false)
  }

  useEffect(() => {
    const editProduct = cart.find((item) => item.id === productCartId)
    let newCart

    if(editProduct) {
      newCart = cart.map((x) => (
        x.id == productCartId ? { ...x, amount: newAmount } : x
      ))
    } else {
      newCart = cart
    }
    setCart(newCart)
    setProductCartId(null)
    handleSubtotal(newCart)
  }, [newAmount, cart])

  const opciones = { useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0 };

  return (
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
            Carrito
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
                borderBottom: '1px solid #DDD',
                cursor: 'pointer'
              }}
              onClick={() => {handleOpenProductOptions(x.id, x.amount)}}
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
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px 0px 10px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleOpenBill}
          >
            Go to pay
          </Button>
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
              Subtotal:
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
              ${subtotal.toLocaleString('es', opciones)}
            </Typography>
          </Box>
        </Box>
        <AlertDialog
          title='Edit'
          icon={
            <IconButton
              color="error"
              size="large"
              onClick={() => {handleDelete(productCartId)}}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          }
          open={productCartOptions}
          handleClose={handleCloseProductOptions}
        >
          <EditCartProducts handleClose={handleCloseProductOptions} setNewAmount={setNewAmount} />
        </AlertDialog>
        <AlertDialog
          open={bill}
          handleClose={handleCloseBill}
        >
          <TotalToPay cart={cart} subtotal={subtotal} handleClose={handleCloseBill} />
        </AlertDialog>
    </Stack>
  );
};
export default ShoppingCart;
