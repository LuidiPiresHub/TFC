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

export interface IMatches {
  type: string | null,
  message: string | IMessage[]
}

export interface IBody {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
