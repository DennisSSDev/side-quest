import React, { useState } from 'react';
import { Box, Form, FormField, Heading, Button } from 'grommet';
import { PropTypes } from 'prop-types';
import { withCSRF, post } from '../../util';

const VisualComponent = props => {
  const [formData, setFormData] = useState({
    oldpass: '',
    pass: '',
    pass2: ''
  });
  const handleSubmit = async () => {
    const resp = await post('/changePassword', formData, props.csrf);
    if (!resp.ok) {
      const data = await resp.json();
      console.log(data.error);
      return;
    }
    window.location.reload();
  };
  const handleUserInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box alignSelf="center" pad={{ bottom: 'medium' }}>
        <Heading textAlign="center" size="small">
          Change Password
        </Heading>
        <Form>
          <FormField
            name="oldpass"
            onChange={handleUserInput}
            label="Current Password"
            type="password"
          />
          <FormField
            name="pass"
            onChange={handleUserInput}
            type="password"
            label="New Password"
          />
          <FormField
            name="pass2"
            onChange={handleUserInput}
            type="password"
            label="Retype Password"
          />
          <Button onClick={handleSubmit} type="submit" label="Update" />
        </Form>
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  csrf: PropTypes.string.isRequired
};

const Security = withCSRF(VisualComponent);

export default Security;
