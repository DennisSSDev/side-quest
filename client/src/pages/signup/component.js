import React from 'react';
import { Box } from 'grommet';
import NavBar from '../../components/navbar/component';
import Signup from '../../components/signup/component';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Signup />
  </>
);

const SignupPage = VisualComponent;

export default SignupPage;
