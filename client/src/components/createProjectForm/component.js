import React, { useState } from 'react';
import { Box, Form, FormField, Paragraph, Button, TextArea } from 'grommet';
import FileBase64 from 'react-file-base64';
import { PropTypes } from 'prop-types';
import { DateInput, smallDate } from 'grommet-controls';
import { withCSRF, post, redirect } from '../../util';
import SpecialForm from './transpile';

const VisualComponent = props => {
  const [formData, setFormData] = useState({
    projectName: '',
    hook: '',
    description: '',
    external: '',
    joinRequirements: '',
    projectIcon: '',
    projectScreenshots: [],
    startDate: smallDate(new Date()),
    endDate: smallDate(new Date()),
    redirect: false
  });
  const handleSubmit = async () => {
    const {
      projectName,
      hook,
      description,
      joinRequirements,
      startDate,
      endDate
    } = formData;
    console.log(formData);
    if (
      !projectName ||
      !hook ||
      !description ||
      !joinRequirements ||
      !startDate ||
      !endDate
    )
      return;
    const resp = await post('/createProject', formData, props.csrf);
    if (!resp.ok) {
      const data = await resp.json();
      console.log(data.error);
      return;
    }
    setFormData({ redirect: true });
  };
  const handleIconUpload = file => {
    setFormData({ ...formData, projectIcon: file.base64 });
  };
  const handleUserInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartDate = ({ target: { value } }) => {
    setFormData({ ...formData, startDate: value });
  };

  const handleEndDate = ({ target: { value } }) => {
    console.log(value);
    setFormData({ ...formData, endDate: value });
  };

  const handleScreenshotUplaod = files => {
    const { projectScreenshots } = formData;
    files.forEach(el => {
      projectScreenshots.push(el.base64);
    });
    setFormData({ ...formData, projectScreenshots });
  };

  return (
    <>
      {formData.redirect && redirect('/dashboard')}
      <Box alignSelf="center" pad={{ bottom: 'medium' }}>
        <Box margin="10px" />
        <Form>
          <FormField
            name="projectName"
            onChange={handleUserInput}
            label="Unique Project Name"
            required
          />
          <FormField
            name="external"
            onChange={handleUserInput}
            label="External Link"
            placeholder="https://"
          />
          <TextArea
            label="Project Hook"
            name="hook"
            onChange={handleUserInput}
            placeholder="1-2 sentence elevator pitch to get the users pumped about your project"
            required
          />
          <TextArea
            label="Project Description"
            name="description"
            onChange={handleUserInput}
            placeholder="A long description explaining some of the details of the project"
          />
          <TextArea
            label="join Requirements"
            name="joinRequirements"
            onChange={handleUserInput}
            placeholder="Describe who are you looking for? Programmers, artists or producers? What kind of skills should they posses."
            required
          />
          <Box direction="row">
            <Box direction="column" margin={{ bottom: 'medium' }}>
              <Paragraph>Upload Project Icon</Paragraph>
              <FileBase64 multiple={false} onDone={handleIconUpload} />
            </Box>
            <Box direction="column" margin={{ bottom: 'medium' }}>
              <Paragraph>Upload Screenshots</Paragraph>
              <FileBase64 multiple={true} onDone={handleScreenshotUplaod} />
            </Box>
          </Box>
        </Form>
        <Box>
          <SpecialForm>
            <Box direction="row" align="baseline">
              <Box>
                <Box margin={{ left: 'small' }}>
                  <Paragraph>Start Date</Paragraph>
                </Box>
                <DateInput
                  placeholder="DD/MM/YYYY"
                  value={formData.startDate}
                  onChange={handleStartDate}
                />
              </Box>
              <Box pad={{ left: 'small' }}>
                <Box margin={{ left: 'small' }}>
                  <Paragraph>End Date</Paragraph>
                </Box>
                <DateInput
                  placeholder="DD/MM/YYYY"
                  value={formData.endDate}
                  onChange={handleEndDate}
                />
              </Box>
            </Box>
          </SpecialForm>
        </Box>
        <Box margin="35px" />
        <Box pad={{ vertical: 'large' }}>
          <Button onClick={handleSubmit} type="submit" label="Create Project" />
        </Box>
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  csrf: PropTypes.string.isRequired
};

const CreateProjectForm = withCSRF(VisualComponent);

export default CreateProjectForm;
