import HomeIcon from '@mui/icons-material/Home'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Layout: React.FC = (props) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}

            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ethereum Kickstarter
          </Typography>
          {/* {!userAddress && <Button color="inherit" onClick={handleLogin}>Login</Button>} */}
        </Toolbar>
      </AppBar>
      <main>
        {props.children}
      </main>
    </>
  )
}

export default Layout
