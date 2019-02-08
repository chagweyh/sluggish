import jwtDecode from 'jwt-decode';

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export { getCurrentUser };
