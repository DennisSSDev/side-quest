import React from 'react';
import { Heading, Box, Form, FormField, Button } from 'grommet';
import { Twemoji } from 'react-emoji-render';
import { Link } from 'react-router-dom';

const VisualComponent = () => (
  <>
    <Box align="center" justify="center" direction="column">
      <Box animation="zoomIn">
        <Box animation={{ type: 'fadeIn', duration: 500 }}>
          <Heading>
            <Twemoji text="Nice to see a familiar face! 🧐" />
          </Heading>
        </Box>
      </Box>
      <Box animation={{ type: 'slideUp', duration: 800, delay: 600 }}>
        <Box animation={{ type: 'fadeIn', duration: 900, delay: 400 }}>
          <Form>
            <FormField
              name="username"
              label="Username"
              required
              validate={{
                regexp: new RegExp(
                  '^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$'
                ),
                message: `Woops, that's not a valid email`
              }}
            />
            <FormField
              type="password"
              name="password"
              required
              label="Password"
              validate={{
                regexp: new RegExp(
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                ),
                message: 'This is an invalid password'
              }}
            />
            <Box
              direction="row"
              alignContent="between"
              align="baseline"
              gap="small"
              margin={{ top: 'large' }}
            >
              <Button type="submit" primary label="Submit" />
              <Twemoji text="Time to get back on the Grind! 💪" />
            </Box>
          </Form>
          <Box
            direction="row"
            alignContent="between"
            align="baseline"
            gap="small"
            margin={{ top: 'large' }}
          >
            <Twemoji text="Not a member yet? 👻 No worries!" />
            <Link to="signup" className="genLink">
              <Button label="Sign up" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
);

const Login = VisualComponent;

export default Login;
