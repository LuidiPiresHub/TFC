import IMatches, { IMessage } from '../interfaces/matches';
import Match from '../database/models/Match.model';
import TeamsService from './teams.services';

export default abstract class MatchesService {
  static async getMatches(): Promise<IMatches> {
    const data = await Match.findAll();
    if (!data) return { type: 'error', message: 'Cannot get Matches' };
    const dataMatchesPromises = data.map(async ({ dataValues }) => {
      const { homeTeamId, awayTeamId } = dataValues;
      const { type: type1, message: homeTeam } = await TeamsService.getTeamsById(homeTeamId);
      const { type: type2, message: awayTeam } = await TeamsService.getTeamsById(awayTeamId);
      if (type1 || type2) return { type: 'error', message: 'Cannot Get Teams by Id' };
      const teams = {
        homeTeam: { teamName: homeTeam.teamName },
        awayTeam: { teamName: awayTeam.teamName },
      };
      return { ...dataValues, ...teams };
    });
    const dataMatches = await Promise.all(dataMatchesPromises);
    return { type: null, message: dataMatches };
  }

  static async getMatchesByQuery(query: string) {
    const queryBool = query === 'true';
    console.log(queryBool);
    const data = await this.getMatches();
    if (!data) return { type: 'error', message: 'Cannot get Matches' };
    const matchList = data.message as IMessage[];
    const filteredData = matchList.filter(({ inProgress }) => inProgress === queryBool);
    return { type: null, message: filteredData };
  }
}
