import React from 'react';
import { Box, Heading, Button } from 'grommet';
import { Link } from 'react-router-dom';
import { Twemoji } from 'react-emoji-render';
import NavBar from '../../components/navbar/component';

const VisualComponent = () => (
  <>
    <NavBar />
    <Box margin="large" />
    <Box margin="large" />
    <Box
      gridArea="header"
      direction="row"
      align="center"
      justify="center"
      height="small"
      alignSelf="center"
    >
      <Box animation="zoomIn">
        <Box animation={{ type: 'fadeIn', duration: 500 }} alignSelf="center">
          <Heading textAlign="center">
            <Twemoji text="👾 404 👾" />
          </Heading>
          <Heading>
            <Twemoji
              textAlign="center"
              text="Seems like you missed a turn 😅"
            />
          </Heading>
        </Box>
        <Box animation={{ type: 'fadeIn', duration: 900, delay: 400 }}>
          <Box
            direction="row"
            alignContent="between"
            align="baseline"
            gap="small"
            margin={{ top: 'large' }}
            animation={{ type: 'slideUp', duration: 800, delay: 600 }}
          >
            <Link to="/" className="genLink">
              <Button primary label="Return to Home" />
            </Link>
            <Twemoji text="Here is where you want to start you adventure! 😎" />
          </Box>
        </Box>
      </Box>
    </Box>
  </>
);

const NoPageFound = VisualComponent;

export default NoPageFound;
