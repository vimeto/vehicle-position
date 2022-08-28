import React from 'react';
import { Box } from '@mui/material';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home/Home';
import Users from '@src/pages/Users/Users';
import { User } from '@src/entities/user/types';
import { PagePath } from './type';

// const Home: React.FC = () => {
//   return (
//     <h1>tis is home</h1>
//   )
// }

// const Users: React.FC = () => {
//   return (
//     <h1>tis is users</h1>
//   )
// }

const Router: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  console.log(currentUser);

  return (
    <Box sx={{ mt: '50px', p: 1.5 }}>
      <Switch>
        <Route exact path={PagePath.Users}><Users currentUser={currentUser} /></Route>
        <Route path={PagePath.Root} component={Home} />
      </Switch>
    </Box>
  );
};

export default Router;
