import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { createToken, verifyToken } from '../auth/jwtFunctions';
import User from '../database/models/Users.model';
import { ILogin, IResponse } from '../interfaces/login';

export default abstract class UserService {
  static async login({ email, password }: ILogin): Promise<IResponse> {
    const userData = await User.findOne({ where: { email } });
    if (!userData) return { type: 'error', message: 'Incorrect email or password' };
    const { dataValues } = userData;
    const decrypted = bcrypt.compareSync(password, dataValues.password);
    if (!decrypted) return { type: 'error', message: 'Incorrect email or password' };
    const { password: _, ...dataWithoutPassword } = dataValues;
    const token = createToken(dataWithoutPassword);
    return { type: null, message: token };
  }

  static async validate(token: string): Promise<IResponse> {
    const { data } = verifyToken(token) as JwtPayload;
    if (!data) return { type: 'error', message: 'Invalid or Expired token' };
    return { type: null, message: data.role };
  }
}
