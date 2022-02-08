import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import Subject from '@mui/icons-material/Subject';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../router/routes';
import { AppBar, IconButton, SwipeableDrawer, Toolbar, useMediaQuery } from '@mui/material';

const drawerWidth = 240

export const SideMenuComponent: React.FunctionComponent<any> = ({ children }) => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width:600px)')
    const [ isOpen, setIsOpen ] = useState(false)
    const { pathname } = useLocation()
    const [ selectedRoute, setSelectedRoute ] = useState(pathname)

    const onNavigate = (route: string) => () => {
      setIsOpen(false)
      setSelectedRoute(route)
      navigate(route)
    }

    const toggleDrawer = (newState: boolean) => () => { setIsOpen(newState) }

    const menuItems = () => (
      <List>
        <ListItem 
          button 
          key={'give-consent'}
          onClick={onNavigate(Routes.GiveConsent)}
          sx={{ bgcolor: selectedRoute === Routes.GiveConsent ? '#d3d3d3' : 'white' }}
        >
          <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
          <ListItemText primary={'Give consent'} />
        </ListItem>
        <ListItem
          button
          key={'collected-consents'}
          onClick={onNavigate(Routes.CollectedConsents)}
          sx={{ bgcolor: selectedRoute === Routes.CollectedConsents ? '#d3d3d3' : 'white' }}
        >
          <ListItemIcon><Subject /></ListItemIcon>
          <ListItemText primary={'Collected consents'} />
        </ListItem>
      </List>
    )

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {
            isMobile ?
            <>
              <AppBar position="fixed">
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}
                    edge="start"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <SwipeableDrawer
                anchor={'left'}
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <Divider />
                { menuItems() }
              </SwipeableDrawer> 
            </> : 
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Divider />
              { menuItems() }
            </Drawer>
          }
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: isMobile ? 5 : 0 }}
          >
            {children}
          </Box>
        </Box>
      );
}
