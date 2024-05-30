import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const HomePage = () => {
    return(
        <Box
            position='relative'
        >
            <Stack
                margin='20px'
                color='#1976d2'
            >
                <Typography 
                    variant='h1'
                    fontWeight='bold'
                    fontSize='80px'
                >
                    OpenStore
                </Typography>
            </Stack>
            <Box
                width='400px'
                margin='0px 120px 0px 0px'
                display='flex'
                flexDirection='column'
                alignItems='flex-end'
            >
                <Typography textAlign='right' variant='h4' fontSize='30px' fontWeight='light'>
                    The right hand of your
                    <br/>
                    store
                </Typography>
                <br/>
                <Link href='/sign-up'>
                    <Button variant='contained' >
                        Sign up
                    </Button>
                </Link>
                
            </Box>
        </Box>
    )
}

export default HomePage