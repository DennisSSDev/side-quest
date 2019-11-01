import React from 'react';
import { Box, Heading } from 'grommet';
import NavBar from '../../components/navbar/component';
import Footer from '../../components/footer/component';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Box>
      <Heading textAlign="center">Project Search</Heading>
    </Box>
    <Footer />
  </>
);

const ProjectSearch = VisualComponent;

export default ProjectSearch;
