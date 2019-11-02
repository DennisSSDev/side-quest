import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

// allows me to call once after the initial render
const useMountEffect = func => useEffect(func, []);

export const withCSRF = BaseComponent => ({ ...props }) => {
  const [csrf, setCSRF] = useState('');
  const requestCSRF = async () => {
    const resp = await fetch('/token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      setCSRF(data.csrfToken);
    }
  };
  useMountEffect(() => {
    requestCSRF();
  });
  return <BaseComponent {...props} csrf={csrf} />;
};

export const isPublic = BaseComponent => ({ ...props }) => {
  const [rerouteObj, setReroute] = useState({ reroute: false, to: '/' });
  const isLoggedIn = async () => {
    const resp = await fetch('/public', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const data = await resp.json();
    if (data && data.redirect !== '') {
      setReroute({ reroute: true, to: data.redirect });
    }
  };
  useMountEffect(() => {
    isLoggedIn();
  });
  if (!rerouteObj.reroute) {
    return <BaseComponent {...props} />;
  }
  return <Redirect to={rerouteObj.to} />;
};

export const isAuthorized = BaseComponent => ({ ...props }) => {
  const [rerouteObj, setReroute] = useState({ reroute: false, to: '/' });
  const isLoggedIn = async () => {
    const resp = await fetch('/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const data = await resp.json();
    if (data && data.redirect !== '') {
      setReroute({ reroute: true, to: data.redirect });
    }
  };
  useMountEffect(() => {
    isLoggedIn();
  });
  if (!rerouteObj.reroute) {
    return <BaseComponent {...props} />;
  }
  return <Redirect to={rerouteObj.to} />;
};

export default useMountEffect;
