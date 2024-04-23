import { Paper, Stack, Typography } from '@mui/material'

const HomePage = () => {
    <Stack>
        <Stack>
            <Typography variant='h1'>
                Welcome To OpenStore
            </Typography>
            <Stack>
                <Typography>
                    OpenStore is the right hand for all the stores, many services and utilites for make you work more easy. know more here.
                </Typography>
            </Stack>
        </Stack>
        <Stack>
            <Paper>
                <Typography>
                    Inventary system
                </Typography>
            </Paper>
            <Paper>
                <Typography>
                    Control for all the transactions
                </Typography>
            </Paper>
            <Paper>
                <Typography>
                    use friendly
                </Typography>
            </Paper>
        </Stack>
    </Stack>
}

export default HomePage