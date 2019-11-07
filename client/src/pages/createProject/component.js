import React from 'react';
import { Box, Heading } from 'grommet';
import NavBar from '../../components/navbar/component';
import { isAuthorized } from '../../util';
import CreateProjectForm from '../../components/createProjectForm/component';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
    <Box alignSelf="center">
      <Heading textAlign="center">Create Project</Heading>
    </Box>
    <CreateProjectForm />
  </>
);

const CreateProject = isAuthorized(VisualComponent);

export default CreateProject;
