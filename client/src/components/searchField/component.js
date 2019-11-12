import React from 'react';
import { Box, TextInput, Image, Heading, Paragraph, Button } from 'grommet';
import { IconButton } from 'grommet-controls';
import { Search, User } from 'grommet-icons';
import { Link } from 'react-router-dom';
import useMountEffect, { withCSRF, request } from '../../util';

const VisualComponent = () => {
  const [data, setData] = React.useState({});
  const requestInitialProjectsData = async signal => {
    const resp = await request('/projects', signal);
    if (!resp.ok) {
      const json = await resp.json();
      console.log(json.error);
      return;
    }
    const json = await resp.json();
    setData({ ...data, projects: json });
  };
  useMountEffect(() => {
    const controller = new AbortController();
    requestInitialProjectsData(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });

  const requestSpecificProjects = async () => {
    const controller = new AbortController();
    if (!data.input) return;
    const resp = await request(
      `/projects?title=${data.input.replace(/ /g, '+')}`,
      controller.signal
    );
    if (!resp.ok) {
      const json = await resp.json();
      console.log(json.error);
      return;
    }
    const json = await resp.json();
    console.log(json);
    setData({ ...data, projects: json });
  };
  return (
    <>
      <Box
        direction="row"
        align="center"
        justify="center"
        height="70px"
        width="medium"
        alignSelf="center"
      >
        <TextInput
          placeholder="Try typing game or animation..."
          onChange={event => setData({ ...data, input: event.target.value })}
        />
        <IconButton
          margin={{ left: 'small' }}
          icon={<Search />}
          onClick={requestSpecificProjects}
        />
      </Box>
      <Box>
        {data.projects &&
          data.projects.docs.map(val => (
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

const SearchField = withCSRF(VisualComponent);

export default SearchField;
