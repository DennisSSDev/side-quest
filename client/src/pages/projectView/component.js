import React, { useState } from 'react';
import { Box, Heading, Image, Paragraph, Button, Carousel } from 'grommet';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { User, Twitter, Mail } from 'grommet-icons';
import NavBar from '../../components/navbar/component';
import useMountEffect, {
  isAuthorized,
  withGET,
  request,
  post
} from '../../util';
import LinkIcon from '../../components/listPersonalProjects/transpile';

const VisualComponent = props => {
  const { doc } = props.props.data;
  const [usersData, updateUsersData] = useState({});

  const requestJoinProject = async () => {
    const controller = new AbortController();
    const resp = await request('/token', controller.signal);
    if (!resp.ok) {
      return;
    }
    const data = await resp.json();
    const resp2 = await post(
      '/joinProject',
      { id: props.props.match.params.id },
      data.csrfToken
    );
    if (!resp2.ok) {
      const json = await resp2.json();
      console.log(json.error);
      return;
    }
    window.location.reload();
  };
  const requestData = async signal => {
    const resp = await request(
      `/project/userdata?id=${props.props.match.params.id}`,
      signal
    );
    if (!resp.ok) {
      const json = await resp.json();
      console.log(json.error);
      return;
    }
    const json = await resp.json();
    const resp2 = await request('/userdata', signal);
    if (!resp2.ok) {
      const json2 = await resp2.json();
      console.log(json2.error);
      return;
    }
    const json2 = await resp2.json();
    updateUsersData({ json, userdata: json2 });
  };
  useMountEffect(() => {
    const controller = new AbortController();
    requestData(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  if (!doc) return null;
  // console.log(doc);
  console.log(usersData);
  let joinedProjectsCopy = [];
  if (
    usersData.userdata &&
    usersData.userdata.data &&
    usersData.userdata.data.joinedProjects
  ) {
    const { joinedProjects } = usersData.userdata.data;
    console.log(joinedProjects);
    joinedProjectsCopy = joinedProjects;
  }
  return (
    <>
      <NavBar />
      <Box width="xsmall" pad={{ bottom: 'large', top: 'large' }} />
      <Box>
        <Heading textAlign="center" alignSelf="center">
          Project View
        </Heading>
        <Box alignSelf="center" margin={{ vertical: 'small' }}>
          <Box direction="column" background="#1a1a1a" round flex>
            <Box
              direction="row"
              align="center"
              alignSelf="center"
              background="#1a1a1a"
              round
            >
              <Box
                height="small"
                width="small"
                margin={{ left: 'medium' }}
                align="center"
                alignSelf="center"
                justify="center"
              >
                <Image
                  className="round small"
                  fit="contain"
                  src={doc.projectIcon}
                />
              </Box>
              <Box
                margin={{ horizontal: 'medium' }}
                align="start"
                width="large"
              >
                <Heading
                  textAlign="start"
                  size="25px"
                  margin={{ vertical: '2px' }}
                >
                  {doc.projectName}
                </Heading>
                <Paragraph
                  fill
                  responsive
                  size="medium"
                  textAlign="start"
                  margin={{ vertical: '4px' }}
                >
                  {doc.hook}
                </Paragraph>
                <Paragraph
                  size="small"
                  textAlign="start"
                  margin={{ vertical: '4px' }}
                >
                  Start Date: {doc.startDate || '~'}
                </Paragraph>
                <Paragraph
                  size="small"
                  textAlign="start"
                  margin={{ vertical: '4px' }}
                >
                  End Date: {doc.endDate || '~'}
                </Paragraph>
                <Box
                  alignContent="center"
                  direction="row"
                  margin={{ bottom: '5px' }}
                >
                  <User size="20px" />
                  <Box pad={{ horizontal: '5px' }} />
                  <Paragraph
                    textAlign="start"
                    size="small"
                    margin={{ vertical: '1px' }}
                  >
                    {doc.teammates.length + 1}
                  </Paragraph>
                </Box>
                {doc.external && (
                  <Box
                    alignContent="center"
                    direction="row"
                    margin={{ bottom: '5px' }}
                  >
                    <LinkIcon size="20px" />
                    <Box pad={{ horizontal: '5px' }} />
                    <Paragraph
                      textAlign="start"
                      size="small"
                      margin={{ vertical: '1px' }}
                    >
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={doc.external}
                        className="specLink"
                      >
                        {doc.external}
                      </a>
                    </Paragraph>
                  </Box>
                )}
              </Box>
              <Box margin={{ horizontal: '10px' }} />
              <Box
                margin={{ horizontal: 'large' }}
                alignSelf="center"
                align="end"
              >
                {(!joinedProjectsCopy.includes(props.props.match.params.id) && (
                  <Button
                    margin={{ horizontal: '5px' }}
                    label="Join Project"
                    onClick={requestJoinProject}
                  />
                )) || (
                  <Heading color="lightgreen" size="20px">
                    You are a member
                  </Heading>
                )}
              </Box>
            </Box>
            <Box alignSelf="start" margin={{ left: '10%' }}>
              <Heading textAlign="start" size="30px">
                Description
              </Heading>
            </Box>
            <Box
              direction="row"
              alignSelf="center"
              align="center"
              background="#1a1a1a"
              round
              fill
              margin={{ horizontal: '20%' }}
            >
              <Paragraph
                size="large"
                alignSelf="center"
                fill
                margin={{ horizontal: '18%' }}
                textAlign="start"
              >
                {doc.description}
              </Paragraph>
            </Box>
            <Box alignSelf="start" margin={{ left: '10%' }}>
              <Heading textAlign="start" size="30px">
                Requirements
              </Heading>
            </Box>
            <Box
              direction="row"
              alignSelf="center"
              align="center"
              background="#1a1a1a"
              round
              fill
              margin={{ horizontal: '4%' }}
            >
              <Paragraph
                size="large"
                alignSelf="center"
                fill
                margin={{ horizontal: '18%' }}
                textAlign="start"
              >
                {doc.joinRequirements}
              </Paragraph>
            </Box>
            {doc.projectScreenshots.length > 0 && (
              <Box>
                <Box alignSelf="start" margin={{ left: '10%' }}>
                  <Heading textAlign="start" size="30px">
                    Screenshots
                  </Heading>
                </Box>
                <Box
                  direction="row"
                  alignSelf="center"
                  align="center"
                  background="#1a1a1a"
                  round
                  fill
                  margin={{ horizontal: '4%' }}
                >
                  {/** deal with the screenshots as well */}
                  <Box height="small" width="medium" overflow="hidden">
                    <Carousel fill>
                      <Image
                        fit="cover"
                        src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
                      />
                      <Image
                        fit="cover"
                        src="//v2.grommet.io/assets/IMG_4245.jpg"
                      />
                      <Image
                        fit="cover"
                        src="//v2.grommet.io/assets/IMG_4210.jpg"
                      />
                    </Carousel>
                  </Box>
                </Box>
              </Box>
            )}
            <Box alignSelf="start" margin={{ left: '10%' }}>
              <Heading textAlign="start" size="30px">
                Owner
              </Heading>
            </Box>
            <Box
              direction="row"
              alignSelf="center"
              align="center"
              background="#1a1a1a"
              round
              fill
              margin={{ horizontal: '20%' }}
            >
              {usersData.json && (
                <Box
                  direction="row"
                  align="center"
                  alignSelf="center"
                  background="#1a1a1a"
                  round
                >
                  <Box
                    height="small"
                    width="small"
                    margin={{ left: '40px', right: '10px' }}
                  >
                    <Image
                      className="round"
                      fit="contain"
                      src={usersData.json.dataOut[0]._doc.photo}
                    />
                  </Box>
                  <Box margin={{ horizontal: 'medium' }}>
                    <Heading
                      textAlign="start"
                      size="25px"
                      margin={{ vertical: '2px' }}
                    >
                      {usersData.json.dataOut[0].username}
                    </Heading>
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
                            href={`https://twitter.com/${usersData.json.dataOut[0]._doc.twitter}`}
                            className="specLink"
                          >
                            {`@${usersData.json.dataOut[0]._doc.twitter}`}
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
                          {usersData.json.dataOut[0]._doc.email}
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
                          {usersData.json.dataOut[0]._doc.fullname}
                        </Paragraph>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            <Box alignSelf="start" margin={{ left: '10%' }}>
              <Heading textAlign="start" size="30px">
                Members
              </Heading>
            </Box>
            <Box
              direction="row"
              alignSelf="center"
              align="center"
              background="#1a1a1a"
              round
              fill
              margin={{ horizontal: '20%' }}
            >
              {/* put the call to the Owner into the component and display the data of the user */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  props: PropTypes.shape({
    data: PropTypes.object,
    match: PropTypes.object
  }),
  csrf: PropTypes.string
};

const ProjectView = compose(
  isAuthorized(VisualComponent),
  withGET(VisualComponent, '/project', '?id=', true)
);

export default ProjectView;
