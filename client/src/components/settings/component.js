import React, { useState } from 'react';
import { Box, Form, FormField, Heading, Paragraph, Button } from 'grommet';
import FileBase64 from 'react-file-base64';
import { PropTypes } from 'prop-types';
import { withCSRF, post } from '../../util';

const VisualComponent = props => {
  const [formData, setFormData] = useState({
    photo: '',
    email: '',
    twitter: '',
    fullname: ''
  });
  const handleSubmit = async () => {
    const resp = await post('/userdata', formData, props.csrf);
    if (!resp.ok) {
      const data = await resp.json();
      console.log(data.error);
      return;
    }
    window.location.reload();
  };
  const handleImageUpload = file => {
    setFormData({ ...formData, photo: file.base64 });
  };
  const handleUserInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box alignSelf="center" pad={{ bottom: 'medium' }}>
        <Heading textAlign="center" size="small">
          Update User Settings
        </Heading>
        <Form>
          <FormField
            name="fullname"
            onChange={handleUserInput}
            label="Full Name"
          />
          <FormField
            name="email"
            onChange={handleUserInput}
            type="email"
            label="Email"
          />
          <FormField
            name="twitter"
            onChange={handleUserInput}
            label="Twitter"
          />

          <Box direction="column" margin={{ bottom: 'medium' }}>
            <Paragraph>Upload Profile Image</Paragraph>
            <FileBase64 multiple={false} onDone={handleImageUpload} />
          </Box>

          <Button onClick={handleSubmit} type="submit" label="Update" />
        </Form>
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  csrf: PropTypes.string.isRequired
};

const Settings = withCSRF(VisualComponent);

export default Settings;
