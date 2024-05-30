'use client'

import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GoogleLogin } from '@react-oauth/google';
import { Box, Stack, Typography } from "@mui/material"
import HandleAccess from '../service/frontend/accessServiceHandler'

const SignUp = () => {
    const router = useRouter()
    return(
        <Stack
            position='relative'
            alignItems='center'
            justifyContent='center'
            style={{ height: '100vh', backgroundColor: '#1976d2', margin: 0 }}
        >
            <Stack
                justifyContent='center'
                sx={{
                    width: '300px',
                    border: '1px solid #d3d3d3',
                    padding: 5,
                    borderRadius: 1,
                    margin: '0px 32px 16px 32px',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                >
                    <AccountCircleIcon
                        sx={{ fontSize: 40 }}
                        color='primary'
                    />
                    <Typography
                        variant="h3"
                        alignContent="center"
                        margin='5px 0px 5px 0px'
                    >
                        Sign Up
                    </Typography>
                </Box>
                <br/>
                <Stack
                    margin='50px'
                    alignItems='center'
                >
                    <GoogleLogin
                        onSuccess={
                            async (credentialResponse) => {
                               try {
                                    await HandleAccess(credentialResponse.credential)
                                    router.push('/dashboard')
                               } catch (error) {
                                    console.error(error)
                               }
                            }
                        }
                        auto_select='true'
                        shape='pill'
                        theme='filled_black'
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default SignUp