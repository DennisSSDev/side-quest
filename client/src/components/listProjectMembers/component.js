import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Heading, Paragraph } from 'grommet';
import { Twitter, Mail, User } from 'grommet-icons';

const VisualComponent = props => {
  if (!props.members) {
    return null;
  }
  return (
    <>
      {props.members.map(val => (
        <Box
          key={val.username}
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
            <Image className="round" fit="contain" src={val._doc.photo} />
          </Box>
          <Box margin={{ horizontal: 'medium' }}>
            <Heading textAlign="start" size="25px" margin={{ vertical: '2px' }}>
              {val.username}
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
                    href={`https://twitter.com/${val._doc.twitter}`}
                    className="specLink"
                  >
                    {`@${val._doc.twitter}`}
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
                  {val._doc.email}
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
                  {val._doc.fullname}
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

VisualComponent.propTypes = {
  members: PropTypes.array
};

const ProjectMembers = VisualComponent;

export default ProjectMembers;
