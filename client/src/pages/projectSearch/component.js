import React from 'react';
import { Box, Heading } from 'grommet';
import NavBar from '../../components/navbar/component';
import Footer from '../../components/footer/component';
import { isAuthorized } from '../../util';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Box alignSelf="center">
      <Heading textAlign="center">Project Search</Heading>
    </Box>
    <Footer />
  </>
);

const ProjectSearch = isAuthorized(VisualComponent);

export default ProjectSearch;
