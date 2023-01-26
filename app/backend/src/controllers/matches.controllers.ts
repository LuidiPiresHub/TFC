import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default abstract class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { type, message } = await MatchesService.getMatches();
      if (type) return res.status(400).json({ message });
      return res.status(200).json(message);
    }
    const { type, message } = await MatchesService.getMatchesByQuery(inProgress as string);
    if (type) return res.status(400).json({ message });
    return res.status(200).json(message);
  }

  static async postMatch(req: Request, res: Response) {
    const { type, message } = await MatchesService.postMatch(req.body);
    if (type) return res.status(404).json({ message });
    return res.status(201).json(message);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchesService.finishMatch(Number(id));
    if (type) return res.status(400).json({ message });
    return res.status(200).json({ message });
  }

  static async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchesService.updateMatches(req.body, Number(id));
    if (type) return res.status(400).json({ message });
    return res.status(200).json({ message });
  }
}
