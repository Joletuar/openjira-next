import { useContext } from 'react';
import NextLink from 'next/link';

import { UIContext } from '@/context/ui';

import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior>
          <Link underline='none' color='white'>
            <Typography variant='h6'>OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
