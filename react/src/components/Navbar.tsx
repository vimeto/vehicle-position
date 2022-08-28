import React, { Suspense } from 'react';
import { Box, Button } from '@mui/material';
import { User } from '@src/entities/user/types';

const Navbar: React.FC<{ currentUser: User }> = ({ currentUser }) => {

  return (
    <Box sx={{ boxShadow: 2, width: '100%', height: '50px', position: 'fixed', display: 'flex', top: 0, justifyContent: 'space-around', alignItems: 'center' }}>
      <Box>
        {`Logged in as ${currentUser.email}`}
      </Box>
      <Button variant="outlined" onClick={() => console.log("logging out bruh")}>
        Logout
      </Button>
    </Box>
  );
}

export default Navbar;
