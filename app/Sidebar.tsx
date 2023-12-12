'use client';

import * as React from 'react';
import { ReactNode } from 'react';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from 'next/link';
import { ListItemText } from '@mui/material';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import TokenIcon from '@mui/icons-material/Token';
import ExploreIcon from '@mui/icons-material/Explore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Tooltip from '@mui/material/Tooltip';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const IconWithTooltip = ({ icon, open, label }: { icon: any; open: boolean; label: string }) => {
  return open ? (
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: open ? 3 : 'auto',
        justifyContent: 'center',
      }}
    >
      {icon}
    </ListItemIcon>
  ) : (
    <Tooltip title={label} placement="right">
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
    </Tooltip>
  );
};

export default function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navItems = [
    {
      label: 'Conversion',
      path: '/conversion',
      icon: <ArchitectureIcon />,
    },
    {
      label: 'Token',
      path: '/token',
      icon: <TokenIcon />,
    },
    {
      label: 'Swap',
      path: '/swap',
      icon: <SwapHorizIcon />,
    },
    {
      label: 'NFT',
      path: '/nft',
      icon: <AcUnitIcon />,
    },
    {
      label: 'Explorer',
      path: '/explorer',
      icon: <ExploreIcon />,
    },
    {
      label: 'Transaction',
      path: '/transaction',
      icon: <ReceiptIcon />,
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component={Link} href="/">
            Web3 Whisper
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => {
            return (
              <ListItem
                key={item.path}
                disablePadding
                sx={{
                  display: 'block',
                  backgroundColor: pathname.includes(item.path) ? 'primary.main' : '#fff',
                  color: pathname.includes(item.path) ? '#fff' : '#000',
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component={Link}
                  href={item.path}
                >
                  <IconWithTooltip icon={item.icon} open={open} label={item.label} />
                  <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
