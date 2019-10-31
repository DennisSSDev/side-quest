import React from 'react';
import { Box, Button, Text } from 'grommet';
import { Star } from 'grommet-icons';
import { Link } from 'react-router-dom';

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
      <Link to="/" className="genLink">
        <Button>
          <Text size="xlarge">Side Quest</Text>
        </Button>
      </Link>
    </Box>
    <Box
      pad={{ horizontal: 'medium', vertical: 'small' }}
      direction="row"
      justify="between"
    >
      <Link to="/premium" className="genLink">
        <Button
          color="linear-gradient(180deg, #ebbe9b 0%, #e7a977 74%)"
          primary
          label="Premium"
          margin={{ horizontal: '15px' }}
          active
          icon={<Star color="white" />}
        />
      </Link>
      <Link to="/login" className="genLink">
        <Button primary margin={{ horizontal: '5px' }} label="Log in" />
      </Link>
      <Link to="/signup" className="genLink">
        <Button primary margin={{ horizontal: '5px' }} label="Sign up" />
      </Link>
    </Box>
  </Box>
);

const NavBar = VisualComponent;

export default NavBar;
