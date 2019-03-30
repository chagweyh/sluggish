import jwtDecode from 'jwt-decode';

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
}

function getJwt() {
  return localStorage.getItem('token') || null;
}

export { getCurrentUser, getJwt };
