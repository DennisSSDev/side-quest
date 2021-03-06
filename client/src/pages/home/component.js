import React from 'react';
import {
  Box,
  Heading,
  Grid,
  Paragraph,
  Meter,
  Stack,
  Chart,
  Button
} from 'grommet';
import { StatusGood, Star } from 'grommet-icons';
import { Link } from 'react-router-dom';
import NavBar from '../../components/navbar/component';
import MainAnimation from '../../components/appDisplay/component';
import Footer from '../../components/footer/component';
import { isPublic } from '../../util';

const VisualComponent = () => {
  return (
    <>
      <NavBar />
      <Box
        justify="center"
        direction="column"
        background={'dark-1'}
        fill
        responsive
      >
        <Box animation={{ type: 'zoomIn' }}>
          <Box animation="fadeIn" pad={{ top: '90px' }}>
            <Heading size={'medium'} alignSelf={'center'} textAlign={'start'}>
              The one stop shop for your next project
            </Heading>
          </Box>
        </Box>
        <Box animation={{ type: 'fadeIn', delay: 1000 }} background={'dark-1'}>
          <MainAnimation />
        </Box>
        <Box background={'dark-1'} fill>
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box alignSelf="center">
            <Heading>Finding a team can be hard</Heading>
            <Paragraph alignSelf="center">
              Students and many industry devs always want to work on cool side
              husstles, but face the problem of finding teammates for large
              ideas, as they are occupied with work and school...
            </Paragraph>
            <Paragraph alignSelf="end">
              - Dennis (Twitch Software Engineer)
            </Paragraph>
          </Box>
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box
            background={'dark-1'}
            pad="medium"
            justify="center"
            align="center"
            alignContent="center"
            alignSelf="center"
          >
            <Grid
              areas={[
                { name: 'nav', start: [0, 0], end: [0, 0] },
                { name: 'main', start: [1, 0], end: [1, 0] },
                { name: 'side', start: [2, 0], end: [2, 0] }
              ]}
              columns={['flex', 'flex', 'flex']}
              rows={['flex']}
              justify="center"
            >
              <Box
                gridArea="nav"
                background="brand"
                pad={{ left: 'small' }}
                responsive
              >
                <Box
                  alignSelf="center"
                  align="center"
                  alignContent="center"
                  responsive
                >
                  <Heading responsive>
                    So I made you a platform so you dont have to.
                  </Heading>
                </Box>
              </Box>
              <Box
                gridArea="main"
                pad={{ left: 'large' }}
                margin={{ left: 'large' }}
                responsive
              >
                {[
                  'Easy Search',
                  'Projects by preferences',
                  'No ads or other bs'
                ].map(val => (
                  <Box
                    key={val}
                    direction="row"
                    align="center"
                    gap="small"
                    responsive
                  >
                    <Box>
                      <StatusGood size="medium" color="#8cc800" />
                    </Box>
                    <Box
                      responsive
                      alignSelf="center"
                      align="center"
                      alignContent="center"
                    >
                      <Heading
                        alignSelf="center"
                        size="25px"
                        textAlign="center"
                      >
                        {val}
                      </Heading>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box gridArea="side" margin={{ left: 'xlarge' }} responsive>
                <Stack anchor="left">
                  <Meter
                    type="circle"
                    values={[
                      {
                        value: 76,
                        label: 'Win',
                        highlight: true,
                        onClick: () => {}
                      }
                    ]}
                    round
                    size="300px"
                    thickness="small"
                  />
                  <Box pad={{ left: '60px' }} responsive>
                    <Paragraph
                      size="medium"
                      textAlign="start"
                      alignSelf="end"
                      className="percent"
                      responsive
                    >
                      76% of users have found their next project within 1 hour
                    </Paragraph>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'medium' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'medium' }} />
          <Box
            background={'dark-1'}
            pad="medium"
            justify="center"
            align="center"
            alignContent="center"
            alignSelf="center"
          >
            <Grid
              areas={[
                { name: 'left', start: [0, 0], end: [0, 0] },
                { name: 'center', start: [1, 0], end: [1, 0] },
                { name: 'right', start: [2, 0], end: [2, 0] }
              ]}
              columns={['flex', 'flex', 'flex']}
              rows={['flex']}
              justify="center"
            >
              <Box
                gridArea="left"
                background="brand"
                pad={{ left: 'small' }}
                responsive
              >
                <Heading size="small" alignSelf="center" responsive>
                  There are always projects to work on to keep yourself busy.
                </Heading>
              </Box>
              <Box
                gridArea="center"
                pad={{ left: 'large' }}
                margin={{ left: 'large' }}
              >
                <Chart
                  type="bar"
                  round
                  bounds={[[0, 7], [0, 100]]}
                  values={[
                    { value: [7, 120], label: 'one hundred' },
                    { value: [6, 85], label: 'seventy' },
                    { value: [5, 65], label: 'sixty' },
                    { value: [4, 50], label: 'eighty' },
                    { value: [3, 24], label: 'forty' },
                    { value: [2, 21], label: 'zero' },
                    { value: [1, 10], label: 'thirty' },
                    { value: [0, 5], label: 'sixty' }
                  ]}
                  aria-label="chart"
                />
                <Heading size="20px" className="squished" responsive>
                  The number of projects increased by 500% over the past month
                  of October
                </Heading>
              </Box>
              <Box gridArea="right" margin={{ left: 'xlarge' }}>
                <Stack anchor="left">
                  <Meter
                    type="circle"
                    values={[
                      {
                        value: 88,
                        label: 'Win',
                        highlight: true,
                        onClick: () => {}
                      }
                    ]}
                    round
                    size="300px"
                    thickness="small"
                  />
                  <Box pad={{ left: '60px' }}>
                    <Paragraph
                      size="medium"
                      textAlign="start"
                      alignSelf="end"
                      className="percent"
                      responsive
                    >
                      92% of projects end up being remote
                    </Paragraph>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box width="xsmall" pad={{ top: 'large', bottom: 'large' }} />
          <Box alignSelf="center" responsive>
            <Heading>Subscribe to Premium</Heading>
            <Paragraph alignSelf="center">
              Premium helps me sustain the service, but you also get a nice
              bundle of packages!
            </Paragraph>
          </Box>
          <Box width="xsmall" pad={{ top: 'medium', bottom: 'medium' }} />
          <Box background={'dark-1'} pad="medium">
            <Grid
              align="center"
              alignContent="center"
              justify="center"
              gap="small"
              areas={[
                { name: 'packs', start: [0, 0], end: [0, 0] },
                { name: 'sub', start: [1, 0], end: [1, 0] }
              ]}
              columns={['flex', 'flex']}
              rows={['flex']}
            >
              <Box gridArea="packs" responsive>
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
                      <Heading
                        alignSelf="center"
                        size="25px"
                        textAlign="center"
                      >
                        {val}
                      </Heading>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box gridArea="sub" alignSelf="center" responsive>
                <Box width="medium">
                  <Heading textAlign="center" size="20px">
                    5.99$ / month
                  </Heading>
                  <Heading textAlign="center" size="20px">
                    or
                  </Heading>
                  <Heading textAlign="center" size="20px">
                    49.99$ / year
                  </Heading>
                  <Box animation="pulse" align="center">
                    <Link to="/premium" className="genLink">
                      <Button
                        color="accent-4"
                        primary
                        label="Subscribe to Premium"
                        margin={{ horizontal: '15px' }}
                        icon={<Star />}
                      />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

const Home = isPublic(VisualComponent);

export default Home;
