import React, { useState } from 'react';
import { Heading, Box, Form, FormField, Button } from 'grommet';
import { Twemoji } from 'react-emoji-render';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withCSRF } from '../../util';

const VisualComponent = props => {
  const [formData, updateFormData] = useState({
    redirect: false,
    password: '',
    username: '',
    error: ''
  });

  const handlePasswordChange = e => {
    updateFormData({ ...formData, password: e.target.value });
  };

  const handleUsernameChange = e => {
    updateFormData({ ...formData, username: e.target.value });
  };

  const handleSubmit = async () => {
    const data = {
      username: formData.username,
      pass: formData.password
    };
    if (data.username === '' || data.pass === '') return;
    const resp = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': props.csrf
      },
      body: JSON.stringify(data)
    });
    const respData = await resp.json();
    if (resp.status !== 200) {
      // show error here
      updateFormData({ ...formData, error: respData.error });
      setTimeout(() => {
        updateFormData({ ...formData, error: '' });
      }, 3500);
      return;
    }
    if (respData.redirect === '/dashboard')
      updateFormData({ ...formData, redirect: true });
  };

  const redirect = () => {
    if (formData.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return null;
  };

  return (
    <>
      {redirect()}
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
            <Form action="/signup" method="POST">
              <FormField
                name="username"
                onInput={handleUsernameChange}
                label="Username"
                required
                validate={{
                  regexp: new RegExp(
                    '^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$'
                  ),
                  message: `Woops, that's not a valid username`
                }}
              />
              <FormField
                type="password"
                onInput={handlePasswordChange}
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
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  primary
                  label="Submit"
                />
                <Twemoji text="Time to get back on the Grind! 💪" />
              </Box>
            </Form>
            {formData.error && (
              <Box
                direction="row"
                alignContent="between"
                align="baseline"
                gap="small"
                margin={{ top: 'small' }}
              >
                <Heading size="15px" color="#FF4040">
                  <Twemoji text={`${formData.error} 😞`} />
                </Heading>
              </Box>
            )}
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
};

VisualComponent.propTypes = {
  csrf: PropTypes.string.isRequired
};

const Login = withCSRF(VisualComponent);

export default Login;
