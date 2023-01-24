import Teams from '../database/models/Team.model';

export default abstract class TeamsService {
  static async getTeams() {
    const data = await Teams.findAll();
    if (!data) return { type: 'error', message: 'Cannot get teams' };
    const dataTeams = data.map(({ dataValues }) => dataValues);
    return { type: null, message: dataTeams };
  }

  static async getTeamsById(id: number) {
    const data = await Teams.findByPk(id);
    if (!data) return { type: 'error', message: 'Cannot get team' };
    const { dataValues } = data;
    return { type: null, message: dataValues };
  }
}
