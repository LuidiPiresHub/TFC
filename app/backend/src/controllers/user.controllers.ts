import { Request, Response } from 'express';
import UserService from '../services/user.services';

export default abstract class UserController {
  static async login(req: Request, res: Response) {
    const { type, message } = await UserService.login(req.body);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  }

  static async validate(req: Request, res: Response) {
    const { authorization: token } = req.headers;
    const { type, message } = await UserService.validate(token as string);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ role: message });
  }
}
