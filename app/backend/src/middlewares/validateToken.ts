import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/jwtFunctions';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const result = verifyToken(token as string);
  if (!result) return res.status(401).json({ message: 'Token must be a valid token' });
  req.body.user = result;
  return next();
};

export default validateToken;
