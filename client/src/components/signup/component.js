import React, { useState } from 'react';
import { Heading, Paragraph, Box, Form, FormField, Button } from 'grommet';
import { Twemoji } from 'react-emoji-render';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withCSRF } from '../../util';

const VisualComponent = props => {
  const [checker, updateChecker] = useState({
    isValidPass: true,
    redirect: false,
    password: '',
    password2: '',
    username: '',
    numRange: 0
  });

  const handleInputCheck = e => {
    const data = e.target.value;
    if (data !== checker.password) {
      updateChecker({ ...checker, isValidPass: false });
    } else {
      updateChecker({ ...checker, isValidPass: true, password2: data });
    }
  };

  const passwordStore = e => {
    updateChecker({ ...checker, password: e.target.value });
  };

  const handleUsernameInput = e => {
    updateChecker({ ...checker, username: e.target.value });
  };

  const handleNumberRangeInput = e => {
    updateChecker({ ...checker, numRange: e.target.value });
  };

  const handleSubmit = async () => {
    const data = {
      username: checker.username,
      pass: checker.password,
      pass2: checker.password2,
      range: checker.numRange
    };
    if (
      data.username === '' ||
      data.pass === '' ||
      data.pass2 === '' ||
      data.range > 10 ||
      data.range < 0
    )
      return;
    const resp = await fetch('/signup', {
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
      console.log('error occured');
      return;
    }
    if (respData.redirect && respData)
      updateChecker({ ...checker, redirect: true });
  };

  const redirect = () => {
    if (checker.redirect) {
      return <Redirect to="/dashboard" />;
    }
    return null;
  };
  return (
    <>
      {redirect()}
      <Box align="center" justify="center" direction="column">
        <Box animation="zoomIn">
          <Box animation={{ type: 'fadeIn', duration: 800 }}>
            <Heading size="38px">
              <Twemoji text="🎉 Sign me up champ! 🎉" />
            </Heading>
          </Box>
        </Box>
        <Box
          pad={{ bottom: 'small' }}
          animation={{ type: 'fadeIn', duration: 800, delay: 500 }}
        >
          <Paragraph>
            <Twemoji text={"Trust me, it's a cool place to be 🤗"} />
          </Paragraph>
        </Box>
        <Box animation={{ type: 'slideUp', duration: 800, delay: 1500 }}>
          <Box animation={{ type: 'fadeIn', duration: 900, delay: 1300 }}>
            <Form action="/signup" method="POST">
              <FormField
                name="username"
                label="Your creative 8 letter name goes here"
                required
                onInput={handleUsernameInput}
                validate={{
                  regexp: new RegExp(
                    '^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$'
                  ),
                  message: 'Is this your first time on the internet?'
                }}
              />
              <FormField
                type="password"
                name="password"
                required
                label="Your STRONG password goes here"
                validate={{
                  regexp: new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                  ),
                  message: 'Hmmm... Enter a STROOOONG password pls'
                }}
                onInput={passwordStore}
              />
              <FormField
                type="password"
                name="passwordagain"
                required
                label="Retype your password here"
                validate={{
                  regexp: new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
                  ),
                  message: 'It seems you had issues retyping your password'
                }}
                onInput={handleInputCheck}
              />
              <FormField
                name="humanCheck"
                label="Enter a number between 1 and 10"
                required
                validate={{
                  regexp: new RegExp('^(?:[1-9]|0[1-9]|10)$'),
                  message: 'Do you really not know how much is that?'
                }}
                onInput={handleNumberRangeInput}
              />
              {!checker.isValidPass && (
                <Box
                  direction="row"
                  alignContent="between"
                  align="baseline"
                  gap="small"
                  margin={{ top: 'small' }}
                >
                  <Heading size="15px" color="#FF4040">
                    <Twemoji text="The passwords do not match 😕" />
                  </Heading>
                </Box>
              )}
              <Box
                direction="row"
                alignContent="between"
                align="baseline"
                gap="small"
                margin={{ top: 'small' }}
              >
                <Button
                  type="submit"
                  primary
                  label="Submit"
                  onClick={handleSubmit}
                />
                <Twemoji text="Are you ready to enter the zone? 👽" />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  csrf: PropTypes.string.isRequired
};

const Signup = withCSRF(VisualComponent);

export default Signup;
