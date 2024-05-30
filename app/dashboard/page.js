'use client'

import { Stack, Typography } from "@mui/material";
import { useUserContext } from "@/src/context/userContext";

const Dashboard = () => {
    const user = useUserContext();
    return (
        <Stack>
            <Typography variant="h1" margin='0px 50px'>
                Bienvenido {user?.username}
            </Typography>
        </Stack>
    );
};

export default Dashboard;