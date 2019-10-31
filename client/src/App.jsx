import React from 'react';
import { Grommet, Box } from 'grommet';
import { Route, Switch } from 'react-router-dom';
import { v1 } from 'grommet-theme-v1';
import Home from './pages/home/component';

const App = () => {
  const AppSwitch = () => (
    <>
      <Grommet theme={v1} full>
        <Box fill background="dark-1">
          <Switch>
            <Route exact path="/" component={Home} />
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
