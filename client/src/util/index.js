import React, { useEffect, useState } from 'react';

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

export default useMountEffect;
