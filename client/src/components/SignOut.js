import React, { useEffect } from 'react';

function SignOut({ history }) {
  useEffect(() => {
    localStorage.removeItem('token');
    history.push('/');
  });
  return null;
}

export default SignOut;
