import React from 'react';
import { Box, Heading } from 'grommet';

const VisualComponent = () => (
  <Box
    gridArea="header"
    direction="row"
    align="center"
    justify="center"
    height="small"
  >
    <Heading size="20px">(c) Dennis Slavinsky</Heading>
  </Box>
);

const Footer = VisualComponent;

export default Footer;
