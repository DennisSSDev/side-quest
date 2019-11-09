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

export const withUserData = BaseComponent => ({ ...props }) => {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    twitter: '',
    photo: ''
  });
  const requestUserData = async signal => {
    const resp = await request('/userdata', signal);
    if (!resp.ok) {
      const data = await resp.json();
      console.log(data.error);
      return;
    }
    const data = await resp.json();

    if (data.data === null || data.data.photo === '') {
      const imgResp = await request('/default/image', signal);
      if (!imgResp.ok) {
        const err = await imgResp.json();
        console.log(err.error);
        return;
      }
      const imgData = await imgResp.json();
      data.photo = imgData.img;
    }
    setUserData(data);
  };
  useMountEffect(() => {
    const controller = new AbortController();
    requestUserData(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  return <BaseComponent {...props} userData={userData} />;
};

export const withUserMeta = BaseComponent => ({ ...props }) => {
  const [meta, setMeta] = useState({
    username: '',
    createdAt: Date
  });
  const requestUserData = async signal => {
    const resp = await request('/meta', signal);
    if (!resp.ok) {
      const data = await resp.json();
      console.log(data.error);
      return;
    }
    const data = await resp.json();
    setMeta(data);
  };
  useMountEffect(() => {
    const controller = new AbortController();
    requestUserData(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  return <BaseComponent {...props} meta={meta} />;
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
    const resp = await request('/auth', signal).catch(error => {
      if (error.name === 'AbortError') return; // expected, this is the abort, so just return
      throw error;
    });
    if (!resp) return;
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

export const post = (endpoint, data, csrfToken) => {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CSRF-Token': csrfToken
    },
    body: JSON.stringify(data)
  });
};

export const withGET = (
  BaseComponent,
  endpoint,
  param = '',
  routeProp = false
) => ({ ...props }) => {
  const [data, setData] = useState({});
  const requestData = async signal => {
    const resp = await request(
      `${endpoint}${routeProp ? param.concat(props.match.params.id) : param}`,
      signal
    );
    if (!resp.ok) {
      const json = await resp.json();
      console.log(json.error);
      return;
    }
    const json = await resp.json();
    setData(json);
  };
  useMountEffect(() => {
    const controller = new AbortController();
    requestData(controller.signal);
    return function cleanup() {
      controller.abort();
    };
  });
  return <BaseComponent {...props} data={data} />;
};

export default useMountEffect;
