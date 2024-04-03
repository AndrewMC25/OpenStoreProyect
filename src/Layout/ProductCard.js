import { Box, Typography } from "@mui/material"
import foto from '../../public/image/foto.png'
import Image from "next/image"

const ProductCard = ({ products }) => {
    return (
        <Box
            sx={{
                flexDirection: 'row',
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            {products.map(x => (
                <Box
                    key={x.id}
                    sx={{
                        border: '2px solid #1976d2',
                        borderRadius: 4,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '12px 0px 12px 0px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            margin: '32px 32px 0px 32px'
                        }}
                    >
                        <Image
                            alt="foto"
                            src={foto}
                            style={{
                                width: '200px',
                                height: '200px'
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    margin: '0px 0px 0px 16px'
                                }}
                            >
                                {x.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    margin: '0px 0px 0px 16px'
                                }}
                            >
                                ${x.price}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                margin: 2,
                                border: '1px solid #d6d6d6',
                                borderRadius: 2,
                                padding: 1
                            }}
                        >
                            Cantidad disponible: {x.amount}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default ProductCard