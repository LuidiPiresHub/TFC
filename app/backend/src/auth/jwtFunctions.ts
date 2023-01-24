import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/jwt';

const secret = 'jwt_secret';

export const createToken = (user: IUser) => {
  const token = jwt.sign({ data: user }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return false;
  }
};
