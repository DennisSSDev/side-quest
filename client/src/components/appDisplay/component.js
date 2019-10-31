import React, { useReducer, useEffect } from 'react';
import { Box, Diagram, Grommet, grommet, Stack, Text } from 'grommet';
import { UserFemale, UserManager, Cube, User } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import PropTypes from 'prop-types';

import { v1 } from 'grommet-theme-v1';

import info from './data';

const customTheme = deepMerge(grommet, {
  ...v1,
  diagram: {
    extend: `@keyframes
  example {
    to {
      stroke-dashoffset: 0;
    }
  }
  path {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: example 1.5s ease-in forwards;
  }`
  }
});

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color: 'accent-4',
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest
});

const ObjContainer = ({
  subname,
  other,
  notes,
  align,
  id,
  name,
  textSize,
  skills
}) => (
  <Box
    align={align || 'center'}
    alignSelf="center"
    direction="row"
    gap="medium"
    key={id}
  >
    {notes === 'Male' && <UserManager id={id} size="large" color="#ff8433" />}
    {notes === 'Creator' && <User id={id} size="xlarge" color="accent-4" />}
    {notes === 'Female' && <UserFemale id={id} size="large" color="#00cceb" />}
    {notes === 'Project' && <Cube color="#501eb4" id={id} size="xlarge" />}
    <Box align={align}>
      <Text size="medium" weight="bold">
        {name}
      </Text>
      {subname && <Text size={textSize}> {subname} </Text>}
      {other && <Text size={textSize}> {other} </Text>}
      {skills && <Text size={textSize}> {skills} </Text>}
    </Box>
  </Box>
);

ObjContainer.propTypes = {
  subname: PropTypes.string.isRequired,
  other: PropTypes.string,
  notes: PropTypes.string.isRequired,
  align: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  textSize: PropTypes.string.isRequired,
  skills: PropTypes.string
};

const Container = ({ node, index }) => (
  <ObjContainer
    subname={node.subname}
    other={node.other}
    notes={node.notes}
    id={index}
    key={node.name}
    name={node.name}
    skills={node.skills}
    textSize="small"
  />
);

Container.propTypes = {
  node: PropTypes.object,
  index: PropTypes.number
};

const MainAnimation = () => {
  const reducer = draw => !draw;
  const [draw, toogleDraw] = useReducer(reducer, true);

  useEffect(() => {
    const timer = setInterval(() => {
      toogleDraw();
    }, 1900);
    return () => {
      clearInterval(timer);
    };
  }, [toogleDraw]);

  const connections = [];

  if (draw) {
    connections.push(connection('2', '1', { anchor: 'vertical' }));
    connections.push(connection('3', '1', { anchor: 'vertical' }));
    connections.push(connection('4', '1', { anchor: 'vertical' }));
    connections.push(connection('5', '1', { anchor: 'vertical' }));
    connections.push(
      connection('12', '1', {
        anchor: 'horizontal',
        thickness: '4px',
        offset: 'medium'
      })
    );
  }

  return (
    <Grommet theme={customTheme}>
      <Box align="center" background="dark-1">
        <Box pad="large">
          <Stack>
            <Box>
              <Box direction="row" gap="large">
                {[4, 5].map(id => (
                  <Container key={id} node={info[id - 1]} index={id} />
                ))}
              </Box>
              <Box alignSelf="center">
                <Box
                  id="8"
                  width="xsmall"
                  margin={{ bottom: 'large', top: 'small' }}
                />
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  gap="large"
                >
                  <Box gap="large">
                    <Container node={info[5]} index={12} />
                  </Box>
                  <Box>
                    <Container node={info[0]} index={1} />
                  </Box>
                </Box>
                <Box pad="small" />
                <Box
                  id="4"
                  width="xsmall"
                  margin={{ bottom: 'large', top: 'large' }}
                />
              </Box>
              <Box direction="row" gap="large">
                {[2, 3].map(id => (
                  <Container key={id} node={info[id - 1]} index={id} />
                ))}
              </Box>
            </Box>
            <Diagram connections={connections} />
          </Stack>
        </Box>
      </Box>
    </Grommet>
  );
};

export default MainAnimation;
