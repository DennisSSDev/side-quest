import React from 'react';
import { Box, Heading } from 'grommet';
import NavBar from '../../components/navbar/component';
import Footer from '../../components/footer/component';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Box>
      <Heading textAlign="center">Premium</Heading>
    </Box>
    <Footer />
  </>
);

const Premium = VisualComponent;

export default Premium;