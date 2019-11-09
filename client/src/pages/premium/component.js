import React, { useState } from 'react';
import { Box, Heading, Button } from 'grommet';
import { Star } from 'grommet-icons';
import NavBar from '../../components/navbar/component';
import { isAuthorized, redirect, request } from '../../util';

const VisualComponent = () => {
  const [redirectStatus, setRedirect] = useState(false);
  const activatePremium = async () => {
    const controller = new AbortController();
    const resp = await request('/premium', controller.signal);
    if (!resp.ok) {
      console.log(await resp.json());
      return;
    }
    setRedirect(true);
  };
  return (
    <>
      <NavBar />
      {redirectStatus && redirect('/dashboard')}
      <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
      <Box alignSelf="center">
        <Heading textAlign="center">Premium</Heading>
      </Box>
      <Box alignSelf="center" responsive margin="small">
        {[
          'No limit on project creation / sign up',
          'Private and *VIP* project creation',
          'Can view contact info on projects',
          'Icon for everyone to see your coolness'
        ].map(val => (
          <Box key={val} direction="row" align="center" gap="small">
            <Box>
              <Star size="medium" color="accent-4" />
            </Box>
            <Box>
              <Heading alignSelf="center" size="25px" textAlign="center">
                {val}
              </Heading>
            </Box>
          </Box>
        ))}
      </Box>
      <Box alignSelf="center" width="medium">
        <Button
          color="accent-4"
          primary
          label="Activate Premium"
          margin={{ horizontal: '15px' }}
          onClick={activatePremium}
          icon={<Star />}
        />
      </Box>
    </>
  );
};

const Premium = isAuthorized(VisualComponent);

export default Premium;
