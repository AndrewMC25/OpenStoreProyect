"use client";

import HandleAccess from '../service/frontend/accessServiceHandler'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GoogleLogin } from '@react-oauth/google';
import { Box, Icon, Stack, Typography } from "@mui/material"


const SignUp = () => {
    return(
        <Stack
            alignItems='center'
        >
            <Stack
                justifyContent='center'
                sx={{
                    width: '400px',
                    border: '1px solid #d3d3d3',
                    padding: 5,
                    borderRadius: 1,
                    margin: '0px 32px 16px 32px',
                    alignItems: 'center'
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
                            credentialResponse => {
                                HandleAccess(credentialResponse.credential)
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