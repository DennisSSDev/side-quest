import React from 'react';
import { Box, Button, Text } from 'grommet';
import { Star } from 'grommet-icons';

const VisualComponent = () => (
  <Box
    gridArea="header"
    direction="row"
    align="center"
    justify="between"
    pad={{ horizontal: 'medium', vertical: 'xsmall' }}
    background="#1a1a1a"
    className="sticky"
  >
    <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
      <Button>
        <Text size="xlarge">Side Quest</Text>
      </Button>
    </Box>
    <Box
      pad={{ horizontal: 'medium', vertical: 'small' }}
      direction="row"
      justify="between"
    >
      <Button
        color="linear-gradient(180deg, #ebbe9b 0%, #e7a977 74%)"
        primary
        label="Premium"
        margin={{ horizontal: '15px' }}
        active
        icon={<Star color="white" />}
      />
      <Button primary margin={{ horizontal: '5px' }} label="Log in" />
      <Button primary margin={{ horizontal: '5px' }} label="Sign up" />
    </Box>
  </Box>
);

const NavBar = VisualComponent;

export default NavBar;
