import React from 'react';
import { Box, Heading, Image, Paragraph, Button } from 'grommet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { User } from 'grommet-icons';
import { withGET } from '../../util';
import LinkIcon from '../listPersonalProjects/transpile';

const VisualComponent = props => {
  const { docs } = props.data;
  if (!docs) {
    return null;
  }
  return (
    <>
      <Box>
        {docs.map(val => (
          <Box
            key={val.projectName}
            margin={{ vertical: 'small' }}
            width="large"
          >
            <Box direction="column" flex>
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
                    src={val.projectIcon}
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
                    {val.projectName}
                  </Heading>
                  <Paragraph
                    fill
                    responsive
                    size="medium"
                    textAlign="start"
                    margin={{ vertical: '4px' }}
                  >
                    {val.hook}
                  </Paragraph>
                  <Paragraph
                    size="small"
                    textAlign="start"
                    margin={{ vertical: '4px' }}
                  >
                    Start Date: {val.startDate || '~'}
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
                      {val.teammates.length + 1}
                    </Paragraph>
                  </Box>
                  {val.external && (
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
                          href={val.external}
                          className="specLink"
                        >
                          {val.external}
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
                  <Link to={`/project/${val._id}`} className="genLink">
                    <Button
                      margin={{ horizontal: '5px' }}
                      label="View Project"
                    />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

VisualComponent.propTypes = {
  data: PropTypes.object
};

const ListJoinedProjects = withGET(VisualComponent, '/joinedProjects');

export default ListJoinedProjects;
