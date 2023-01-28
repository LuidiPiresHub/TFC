import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default abstract class LeaderboardController {
  static async getLeaderboard(_req: Request, res: Response) {
    const { type, message } = await LeaderboardService.getLeaderboard();
    if (type) return res.status(404).json({ message });
    return res.status(200).json(message);
  }
}
