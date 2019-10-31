import React from 'react';
import { Box } from 'grommet';
import NavBar from '../../components/navbar/component';
import Login from '../../components/login/component';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Login />
  </>
);

const LoginPage = VisualComponent;

export default LoginPage;
