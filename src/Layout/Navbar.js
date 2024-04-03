import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

const Navbar = ({ navMenu, setNavMenu }) => {
  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => { setNavMenu(!navMenu) }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '40px',
              margin: '16px 0px',
              color: '#ffff',
              flexGrow: 1
            }}
          >
            <strong>
              OpenStore
            </strong>
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Toolbar />
    </Box>
  )
}

export default Navbar
