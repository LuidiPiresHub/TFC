import { Request, Response } from 'express';
import TeamsService from '../services/teams.services';

export default abstract class TeamsController {
  static async getTeams(_req: Request, res: Response) {
    const { type, message } = await TeamsService.getTeams();
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }

  static async getTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await TeamsService.getTeamsById(Number(id));
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }
}
