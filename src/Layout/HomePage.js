import { Paper, Stack, Typography } from '@mui/material'

const HomePage = () => {
    return(
        <Stack>
            <Stack
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Stack
                    margin='100px 0px 100px 100px'
                    color='#1976d2'
                >
                    <Typography
                        variant='h1'
                        fontWeight='bold'
                        fontSize='130px'
                    >
                        Welcome
                    </Typography>
                    <Typography 
                        variant='h1'
                        fontWeight='bold'
                        fontSize='130px'
                    >
                       To OpenStore
                    </Typography>
                </Stack>
                <Stack
                    width='400px'
                    margin='32px'
                    flexDirection='row'
                >
                    <Typography variant='h5'>
                        The right hand of your
                    </Typography>
                    <Typography variant='h5' color='#1976d2' marginLeft='6px' fontWeight='bold'>
                        store
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                flexDirection='row'
                justifyContent='center'
                margin='32px'
            >
                <Paper
                    sx={{
                        display: 'flex',
                        width: '300px',
                        height: '300px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 2,
                        backgroundColor: '#1976d2',
                        color:'white'
                    }}
                >
                    <Typography variant='h6'>
                        Inventary system
                    </Typography>
                </Paper>
                <Paper
                    sx={{
                        display: 'flex',
                        width: '300px',
                        height: '300px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 2,
                        backgroundColor: '#1976d2',
                        color:'white'
                    }}
                >
                    <Typography
                        variant='h6'
                    >
                        Control for all the transactions
                    </Typography>
                </Paper>
                <Paper
                    sx={{
                        display: 'flex',
                        width: '300px',
                        height: '300px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 2,
                        backgroundColor: '#1976d2',
                        color:'white'
                    }}
                >
                    <Typography 
                        variant='h6'
                    >
                        use friendly
                    </Typography>
                </Paper>
            </Stack>
        </Stack>
    )
}

export default HomePage