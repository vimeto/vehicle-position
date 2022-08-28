import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useCurrentUser } from '@src/entities/user/hook';
import AppContextProvider from '@components/context';
import Navbar from './components/Navbar';
import Router from './components/routing/Router';

const App: React.FC = () => {
  const { currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <AppContextProvider>
          <Box>
            {currentUser && (
                <>
                  <Navbar currentUser={currentUser} />
                  <Router currentUser={currentUser} />
                </>
              )}
          </Box>
        </AppContextProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
