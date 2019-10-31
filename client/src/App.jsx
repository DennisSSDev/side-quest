import React from 'react';
import { Grommet, Box } from 'grommet';
import { Route, Switch } from 'react-router-dom';
import { v1 } from 'grommet-theme-v1';
import Home from './pages/home/component';
import SignupPage from './pages/signupPage/component';
import LoginPage from './pages/loginPage/component';

const App = () => {
  const AppSwitch = () => (
    <>
      <Grommet theme={v1} full>
        <Box fill background="dark-1">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Box>
      </Grommet>
    </>
  );
  return (
    <Switch>
      <AppSwitch />
    </Switch>
  );
};

export default App;
