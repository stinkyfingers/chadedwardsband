import jwt_decode from 'jwt-decode';

export const decodeUser = (user) => {
  try {
    return jwt_decode(user.credential);
  } catch (e) {
    console.warn('error decoding user token', e);
    return {}
  }
};