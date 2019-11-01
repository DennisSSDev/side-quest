import React, { useState } from 'react';
import { Heading, Paragraph, Box, Form, FormField, Button } from 'grommet';
import { Twemoji } from 'react-emoji-render';

const VisualComponent = () => {
  const [checker, updateChecker] = useState({
    isValidPass: true,
    password: ''
  });
  const handleInputCheck = e => {
    const data = e.target.value;
    if (data !== checker.password) {
      updateChecker({ ...checker, isValidPass: false });
    } else {
      updateChecker({ ...checker, isValidPass: true });
    }
  };
  const passwordStore = e => {
    updateChecker({ ...checker, password: e.target.value });
  };
  return (
    <>
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
            <Form>
              <FormField
                name="username"
                label="Your creative 8 letter name goes here"
                required
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
                <Button type="submit" primary label="Submit" />
                <Twemoji text="Are you ready to enter the zone? 👽" />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Signup = VisualComponent;

export default Signup;
