import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

const Layout: React.FC = (props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ethereum Kickstarter
          </Typography>
          {/* {!userAddress && <Button color="inherit" onClick={handleLogin}>Login</Button>} */}
        </Toolbar>
      </AppBar>
      <main>
        {props.children}
      </main>

      <footer>
      </footer>
    </>
  )
}

export default Layout
