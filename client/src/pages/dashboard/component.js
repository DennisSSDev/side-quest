import React, { useState } from 'react';
import {
  Box,
  Heading,
  Image,
  Paragraph,
  Tab,
  Tabs,
  Button,
  Text
} from 'grommet';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Twitter, Mail, User } from 'grommet-icons';
import NavBar from '../../components/navbar/component';
import useMountEffect, {
  isAuthorized,
  withUserData,
  withUserMeta,
  request
} from '../../util';
import Settings from '../../components/settings/component';
import Security from '../../components/security/component';
import ListPersonalProjects from '../../components/listPersonalProjects/component';
import ListJoinedProjects from '../../components/listJoinedProjects/component';

const VisualComponent = props => {
  let userPhoto = '';
  let twitterData = '';
  let emailData = '';
  let fullnameData = '';
  const [premiumState, setPremiumState] = useState(false);
  const checkPremiumStatus = async () => {
    const controller = new AbortController();
    const resp = await request('/premium/status', controller.signal);
    if (!resp.ok) {
      console.log(await resp.json());
      return;
    }
    const data = await resp.json();
    setPremiumState(data.status);
  };
  useMountEffect(() => {
    checkPremiumStatus();
  });
  const { createdAt, username } = props.meta;
  const creationTime = new Date(createdAt);
  const currentTime = new Date();
  const diffTime = currentTime.getTime() - creationTime.getTime();
  // To calculate the no. of days between two dates
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (props.userData) {
    const { photo } = props.userData;
    userPhoto = photo;
  }
  if (props.userData && props.userData.data) {
    userPhoto = props.userData.data.photo;
    if (userPhoto === '') {
      userPhoto = props.userData.photo;
    }
    twitterData = props.userData.data.twitter;
    emailData = props.userData.data.email;
    fullnameData = props.userData.data.fullname;
  }
  return (
    <>
      <NavBar />
      <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
      <Box alignSelf="center">
        <Heading textAlign="center">Dashboard</Heading>
      </Box>
      <Box
        direction="row"
        align="center"
        alignSelf="center"
        background="#1a1a1a"
        round
        height="250px"
      >
        <Box
          height="small"
          width="small"
          margin={{ left: '40px', right: '10px' }}
        >
          <Image className="round" fit="contain" src={userPhoto} />
        </Box>
        <Box margin={{ horizontal: 'medium' }}>
          <Heading textAlign="start" size="28px" margin={{ vertical: '2px' }}>
            Welcome Back,
          </Heading>
          <Heading textAlign="start" size="25px" margin={{ vertical: '2px' }}>
            {username || 'Username'}
          </Heading>
          <Paragraph textAlign="start" margin={{ vertical: '4px' }}>
            {`joined ${diffDays} day${
              diffDays > 1 || diffDays === 0 ? 's' : ''
            } ago`}
          </Paragraph>
          <Paragraph textAlign="start" margin={{ vertical: '4px' }}>
            Premium status:
            {premiumState ? (
              <Text color="lightgreen"> Active </Text>
            ) : (
              <Text color="lightgray"> Inactive </Text>
            )}
          </Paragraph>
        </Box>
        <Box margin={{ horizontal: '120px' }} />
        <Box>
          <Box direction="column" margin={{ right: 'medium' }}>
            <Box
              alignContent="center"
              direction="row"
              margin={{ bottom: '5px' }}
            >
              <Twitter />
              <Box pad={{ horizontal: '5px' }} />
              <Paragraph
                textAlign="start"
                size="medium"
                margin={{ vertical: '1px' }}
              >
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://twitter.com/${twitterData}`}
                  className="specLink"
                >
                  {`@${twitterData}`}
                </a>
              </Paragraph>
            </Box>
            <Box
              alignContent="center"
              direction="row"
              margin={{ bottom: '5px' }}
            >
              <Mail />
              <Box pad={{ horizontal: '5px' }} />
              <Paragraph
                textAlign="start"
                size="medium"
                margin={{ vertical: '1px' }}
              >
                {emailData}
              </Paragraph>
            </Box>
            <Box
              alignContent="center"
              direction="row"
              margin={{ bottom: '5px' }}
            >
              <User />
              <Box pad={{ horizontal: '5px' }} />
              <Paragraph
                textAlign="start"
                size="medium"
                margin={{ vertical: '1px' }}
              >
                {fullnameData}
              </Paragraph>
            </Box>
          </Box>
        </Box>
        <Box margin={{ horizontal: 'large' }}>
          <Link to="/createProject" className="genLink">
            <Button
              primary
              margin={{ horizontal: '5px' }}
              label="Create Project"
            />
          </Link>
        </Box>
      </Box>
      <Box>
        <Box pad={{ bottom: '25px' }} />
        <Box alignSelf="center">
          <Tabs>
            <Tab title="Your Projects">
              <Box>
                <ListPersonalProjects />
              </Box>
            </Tab>
            <Tab title="Joined Projects">
              <Box>
                <ListJoinedProjects />
              </Box>
            </Tab>
            <Tab title="Settings">
              <Settings />
            </Tab>
            <Tab title="Security">
              <Security />
            </Tab>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  userData: PropTypes.shape({
    data: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      photo: PropTypes.string,
      twitter: PropTypes.string
    }),
    photo: PropTypes.string
  }),
  meta: PropTypes.object
};

const Dashboard = compose(
  withUserData(withUserMeta(VisualComponent)),
  isAuthorized(VisualComponent)
);

export default Dashboard;
