import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

// allows me to call once after the initial render
const useMountEffect = func => useEffect(func, []);

export const request = (from = '/auth', signal) =>
  fetch(from, {
    signal,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

export const withCSRF = BaseComponent => ({ ...props }) => {
  const [csrf, setCSRF] = useState('');
  const requestCSRF = async signal => {
    const resp = await request('/token', signal);
    if (resp.ok) {
      const data = await resp.json();
      setCSRF(data.csrfToken);
    }
  };
  useMountEffect(() => {
    const controller = new AbortController();
    requestCSRF(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  return <BaseComponent {...props} csrf={csrf} />;
};

export const isPublic = BaseComponent => ({ ...props }) => {
  const [rerouteObj, setReroute] = useState({ reroute: false, to: '/' });
  const isLoggedIn = async signal => {
    const resp = await request('/public', signal);
    const data = await resp.json();
    if (data && data.redirect !== '') {
      setReroute({ reroute: true, to: data.redirect });
    }
  };
  useMountEffect(() => {
    const controller = new AbortController();
    isLoggedIn(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  if (!rerouteObj.reroute) {
    return <BaseComponent {...props} />;
  }
  return <Redirect to={rerouteObj.to} />;
};

export const isAuthorized = BaseComponent => ({ ...props }) => {
  const [rerouteObj, setReroute] = useState({ reroute: false, to: '/' });
  const isLoggedIn = async signal => {
    const resp = await request('/auth', signal);
    const data = await resp.json();
    if (data && data.redirect !== '') {
      setReroute({ reroute: true, to: data.redirect });
    }
  };
  useMountEffect(() => {
    const controller = new AbortController();
    isLoggedIn(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  if (!rerouteObj.reroute) {
    return <BaseComponent {...props} />;
  }
  return <Redirect to={rerouteObj.to} />;
};

export const redirect = (to = '/') => <Redirect to={to} />;

export const toggleVisIfAuthorized = (
  BaseComponent,
  isVisible,
  defaultVis
) => ({ ...props }) => {
  const [display, setDisplay] = useState(false);
  const isLoggedIn = async signal => {
    const resp = await request('/auth', signal);
    const data = await resp.json();
    if (data && data.redirect === '') {
      setDisplay(isVisible);
    } else {
      setDisplay(defaultVis);
    }
  };
  useMountEffect(() => {
    const controller = new AbortController();
    try {
      isLoggedIn(controller.signal);
    } catch (err) {
      console.log(err);
    }
    return function cleanup() {
      controller.abort();
    };
  });
  if (display) {
    return <BaseComponent {...props} />;
  }
  return null;
};

export default useMountEffect;
