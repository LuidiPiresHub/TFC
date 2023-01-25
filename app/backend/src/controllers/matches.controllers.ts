import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default abstract class MatchesController {
  static async getMatches(_req: Request, res: Response) {
    const { type, message } = await MatchesService.getMatches();
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }

  static async getMatchesByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { type, message } = await MatchesService.getMatchesByQuery(inProgress as string);
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }
}
