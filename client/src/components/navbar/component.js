import React, { useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Star, Cubes, User } from 'grommet-icons';
import { Link } from 'react-router-dom';
import useMountEffect, {
  toggleVisIfAuthorized,
  redirect,
  request
} from '../../util';

let LogInButton = () => (
  <Link to="/login" className="genLink">
    <Button primary margin={{ horizontal: '5px' }} label="Log in" />
  </Link>
);

let SignUpButton = () => (
  <Link to="/signup" className="genLink">
    <Button primary margin={{ horizontal: '5px' }} label="Sign up" />
  </Link>
);

let LogOutButton = () => {
  const [shouldRedirect, setRedirect] = useState(false);
  const requestLogOut = async () => {
    const resp = await fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    if (resp.status !== 200) {
      const data = resp.json();
      console.log(data);
    }
    setRedirect(true);
  };
  return (
    <>
      {shouldRedirect && redirect()}
      <Button
        onClick={requestLogOut}
        margin={{ horizontal: '5px' }}
        label="Log out"
      />
    </>
  );
};

let DashboardButton = () => (
  <Link to="/dashboard" className="genLink">
    <Button
      icon={<User />}
      primary
      margin={{ horizontal: '5px' }}
      label="Dashboard"
    />
  </Link>
);

let ProjectSearch = () => (
  <Link to="/projectSearch" className="genLink">
    <Button
      icon={<Cubes />}
      primary
      margin={{ horizontal: '5px' }}
      label="Global Project Search"
    />
  </Link>
);

LogInButton = toggleVisIfAuthorized(LogInButton, false, true);
SignUpButton = toggleVisIfAuthorized(SignUpButton, false, true);
LogOutButton = toggleVisIfAuthorized(LogOutButton, true, false);
DashboardButton = toggleVisIfAuthorized(DashboardButton, true, false);
ProjectSearch = toggleVisIfAuthorized(ProjectSearch, true, false);

const MainButton = () => {
  const [isAuth, setAuth] = useState(false);

  const isLoggedIn = async signal => {
    const resp = await request('/auth', signal);
    const data = await resp.json();
    if (data && data.redirect === '') {
      setAuth(true);
    }
  };
  useMountEffect(() => {
    const controller = new AbortController();
    isLoggedIn(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });

  return (
    <>
      {(isAuth && (
        <Link to="/dashboard" className="genLink">
          <Button>
            <Text size="xlarge">Side Quest</Text>
          </Button>
        </Link>
      )) || (
        <Link to="/" className="genLink">
          <Button>
            <Text size="xlarge">Side Quest</Text>
          </Button>
        </Link>
      )}
    </>
  );
};

const VisualComponent = () => (
  <Box
    gridArea="header"
    direction="row"
    align="center"
    justify="between"
    pad={{ horizontal: 'medium', vertical: 'xsmall' }}
    background="#1a1a1a"
    className="sticky"
  >
    <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
      <MainButton />
    </Box>
    <Box
      pad={{ horizontal: 'small', vertical: 'small' }}
      direction="row"
      justify="between"
      align="end"
    >
      <Link to="/premium" className="genLink">
        <Button
          color="accent-4"
          primary
          label="Premium"
          margin={{ horizontal: '15px' }}
          icon={<Star />}
        />
      </Link>
      <LogInButton />
      <SignUpButton />
      <ProjectSearch />
      <DashboardButton />
      <LogOutButton />
    </Box>
  </Box>
);

const NavBar = VisualComponent;

export default NavBar;
