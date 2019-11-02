import React from 'react';
import { Box } from 'grommet';
import NavBar from '../../components/navbar/component';
import Signup from '../../components/signup/component';
import { isPublic } from '../../util';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Signup />
  </>
);

const SignupPage = isPublic(VisualComponent);

export default SignupPage;
