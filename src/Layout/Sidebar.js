import { Box, Button, Drawer, IconButton, Typography } from "@mui/material"

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StraightenIcon from '@mui/icons-material/Straighten';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";

const Sidebar = ({ navMenu, setNavMenu }) => {
    return (
        <Drawer
            sx={{ width: '300px' }}
            open={navMenu}
            onClose={() => { setNavMenu(false) }}
            PaperProps={{
                sx: {
                    backgroundColor: '#1976d2'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    onClick={() => { setNavMenu(!navMenu) }}
                    sx={{
                        height: '40px',
                        margin: 2,
                        color: '#fff'
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontSize: '40px',
                        margin: '16px 0px',
                        color: '#fff',
                    }}
                >
                    <strong>
                        OpenStore
                    </strong>
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: 3,
                    width: '266px'
                }}
            >
                <Link href='/SalesPanel' >
                    <Button
                        onClick={() => { setNavMenu(false) }}
                        variant="text"
                        size="large"
                        startIcon={<ExitToAppIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        Sales Panel
                    </Button>
                </Link>
                <Link href='inventory' >
                    <Button
                        onClick={() => {
                            setNavMenu(false)
                        }}
                        variant="text"
                        size="large"
                        startIcon={<InventoryIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        Inventory
                    </Button>
                </Link>
                <Link href='/'>
                    <Button
                        onClick={() => { setNavMenu(false) }}
                        variant="text"
                        size="large"
                        startIcon={<TrendingUpIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        Finances
                    </Button>
                </Link>
                <Link href='paper-bin'>
                    <Button
                        onClick={() => {
                            setNavMenu(false)
                        }}
                        variant="text"
                        size="large"
                        startIcon={<DeleteIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        Paper bin
                    </Button>
                </Link>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Typography
                    sx={{
                        margin: '0px 16px',
                        fontSize: '20px',
                        color: '#fff'
                    }}
                >

                    Create
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: 3,
                    width: '266px'
                }}
            >
                <Link href='products '>
                    <Button
                        onClick={() => {
                            setNavMenu(false)
                        }}
                        variant="text"
                        size="large"
                        startIcon={<AddShoppingCartIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        New Product
                    </Button>
                </Link>
                <Link href='brands'>
                    <Button
                        onClick={() => {
                            setNavMenu(false)
                        }}
                        variant="text"
                        size="large"
                        startIcon={<BookmarkIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        New brand
                    </Button>
                </Link>
                <Link href='units'>
                    <Button
                        onClick={() => {
                            setNavMenu(false)
                        }}
                        variant="text"
                        size="large"
                        startIcon={<StraightenIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        New unit
                    </Button>
                </Link>
                <Link href='presentations'>
                    <Button
                        onClick={() => {
                            setNavMenu(false)
                        }}
                        variant="text"
                        size="large"
                        startIcon={<LocalMallIcon />}
                        sx={{
                            width: '240px',
                            margin: '0px 10px',
                            justifyContent: 'flex-start',
                            color: '#fff'
                        }}
                    >
                        New Presentation
                    </Button>
                </Link>
            </Box>
        </Drawer>
    )
}

export default Sidebar