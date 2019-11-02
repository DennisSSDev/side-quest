import React from 'react';
import { Box } from 'grommet';
import NavBar from '../../components/navbar/component';
import Login from '../../components/login/component';
import { isPublic } from '../../util';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Login />
  </>
);

const LoginPage = isPublic(VisualComponent);

export default LoginPage;
