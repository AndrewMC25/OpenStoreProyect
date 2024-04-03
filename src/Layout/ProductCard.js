import { Box, Stack, Typography } from "@mui/material"
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

const ProductCard = ({ products, title }) => {
    const opciones = { useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0 }

    return (
        <Stack>
            <Stack
                    justifyContent='center'
                    sx={{
                        width: '90%',
                        border: '1px solid #d3d3d3',
                        padding: 3,
                        borderRadius: 1,
                        margin: '0px 32px 32px 32px',
                        alignItems: 'center'
                    }}
            >
                <Box
                    sx={{
                        borderBottom: '1px solid #DDD',
                        width: '90%'
                    }}
                >
                    <div>
                        <Typography
                            variant="h4"
                            sx={{
                            height: '36px'
                            }}
                        >
                            {title}
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
                {products.map((x) => (
                <Stack
                    key={x.id}
                    sx={{
                        padding: '24px 0px 0px 0px',
                        borderBottom: '1px solid #DDD',
                        width: '90%'
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
                                    cantidad disponible: {x.amount.toLocaleString('es', opciones)}
                                </span>
                            </div>
                        </li>
                    </ul>
                </Stack>
            ))}
            </Stack>
        </Stack>
    )
}

export default ProductCard