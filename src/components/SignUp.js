"use client";

import HandleAccess from '../service/HandleAccessService'

import { GoogleLogin } from '@react-oauth/google';
import { Box, Stack, Typography } from "@mui/material"


const SignUp = () => {
    return(
        <Stack
            alignItems='center'
        >
            <Stack
                justifyContent='center'
                sx={{
                    width: '500px',
                    border: '1px solid #d3d3d3',
                    padding: 5,
                    borderRadius: 1,
                    margin: '0px 32px 16px 32px',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography
                        width="auto"
                        variant="h4"
                        alignContent="center"
                        margin='0px 0px 5px 0px'
                    >
                        Sign Up
                    </Typography>
                </Box>
                <Typography
                    color='gray'
                >
                    use
                </Typography>
                <br/>
                <GoogleLogin
                    onSuccess={
                         credentialResponse => {
                            HandleAccess(credentialResponse.credential)
                        }
                    }
                    auto_select='true'
                    shape='pill'
                    theme='filled_black'
                    size='large'
                />
            </Stack>
        </Stack>
    )
}

export default SignUp