import { summariseMatch } from './../matches/utils'
import { gamesWonByPlayerName, totalGamesPlayed } from './../games/utils'
import { RawMatchData, SummarisedMatchData, PlayerName } from '../types'

export const getAllPlayerNames = (draw: SummarisedMatchData[]): PlayerName[] =>
	[
		...new Set(draw.reduce<PlayerName[]>((acc, current) => [...acc, current.player0.name, current.player1.name], [])),
	] as PlayerName[]

export const summariseTennisDraws = (draws: RawMatchData[]): SummarisedMatchData[] =>
	draws.map(({ matchId, player0, player1, pointsProgression }) => {
		const matchSummary = summariseMatch(pointsProgression)

		return {
			matchId,
			player0: { ...player0, ...matchSummary.player0 },
			player1: { ...player1, ...matchSummary.player1 },
		}
	})

export const getPlayerTournamentStats = (name: PlayerName, draw: SummarisedMatchData[]) => {
	const totalGames = totalGamesPlayed(draw)
	const gamesWon = gamesWonByPlayerName(name, draw)
	const gamesLoss = totalGames - gamesWon

	return `${name} Stats: Games Won - ${gamesWon}, Games Loss - ${gamesLoss}`
}
