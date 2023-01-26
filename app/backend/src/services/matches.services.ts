import { IMatches, IMessage, IBody } from '../interfaces/matches';
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
    const data = await this.getMatches();
    if (!data) return { type: 'error', message: 'Cannot get Matches' };
    const matchList = data.message as IMessage[];
    const filteredData = matchList.filter(({ inProgress }) => inProgress === queryBool);
    return { type: null, message: filteredData };
  }

  static async postMatch(body: IBody) {
    const { homeTeamId, awayTeamId } = body;
    const homeTeam = await Match.findByPk(homeTeamId);
    const awayTeam = await Match.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) return { type: 'error', message: 'There is no team with such id!' };
    const { dataValues } = await Match.create({ ...body, inProgress: true });
    return { type: null, message: dataValues };
  }

  static async finishMatch(id: number) {
    const [affectedRows] = await Match.update({ inProgress: false }, { where: { id } });
    if (affectedRows < 1) return { type: 'error', message: 'This match is already over' };
    return { type: null, message: 'Finished' };
  }

  static async updateMatches(body: IBody, id: number) {
    const [affectedRows] = await Match.update({ ...body }, { where: { id } });
    if (affectedRows < 1) return { type: 'error', message: 'Match does not exist' };
    return { type: null, message: 'Updated' };
  }
}
