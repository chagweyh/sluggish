import { useEffect } from 'react';

function SignOut() {
  useEffect(() => {
    localStorage.removeItem('token');
    window.location = '/';
  });
  return null;
}

export default SignOut;
