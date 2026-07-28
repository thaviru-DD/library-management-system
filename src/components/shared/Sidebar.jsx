'use client';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/admin' },
  { label: 'Book Management', icon: <MenuBookIcon />, href: '/admin/books' },
  { label: 'Category Management', icon: <CategoryIcon />, href: '/admin/categories' },
  { label: 'User Management', icon: <PeopleIcon />, href: '/admin/users' },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#1F150C',   // your espresso tone
          color: '#E1DCC9',     // parchment text
        },
      }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 3 }}>
         <LibraryBooksIcon sx={{ color: '#E1DCC9', fontSize: 28 }} />
        <Typography sx={{ color: '#E1DCC9', fontWeight: 700, fontSize: '1.1rem' }}>
            Library System
         </Typography>
        </Box>
      <Toolbar /> {/* spacer, matches AppBar height if you have one */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon sx={{ color: '#E1DCC9' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
  sx={{
    mt: 'auto', // <-- pushes this block to the bottom, explained below
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: 2,
    py: 2,
    borderTop: '1px solid rgba(225,220,201,0.15)',
  }}
>
  <Avatar sx={{ width: 36, height: 36, bgcolor: '#412D15' }}>H</Avatar>

  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
    <Typography sx={{ color: '#E1DCC9', fontSize: '0.85rem', fontWeight: 600 }} noWrap>
      Head Librarian
    </Typography>
    <Typography sx={{ color: 'rgba(225,220,201,0.6)', fontSize: '0.75rem' }}>
      Librarian
    </Typography>
  </Box>

  <IconButton size="small" sx={{ color: '#E1DCC9' }}>
    <LogoutIcon fontSize="small" />
  </IconButton>
</Box>
    </Drawer>
  );
}