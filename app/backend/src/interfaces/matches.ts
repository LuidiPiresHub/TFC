export interface IMessage {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string,
  }
  awayTeam: {
    teamName: string,
  }
}

export interface IProgress {
  inProgress: string,
}

export default interface IMatches {
  type: string | null,
  message: string | IMessage[]
}
