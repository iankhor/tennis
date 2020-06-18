import { summariseMatch } from './../matches/utils'
import { gamesWonByPlayerName, totalGamesPlayed } from './../games/utils'

export const summariseTennisDraws = (draws) =>
	draws.map(({ matchId, player0, player1, pointsProgression }) => {
		const matchSummary = summariseMatch(pointsProgression)

		return {
			matchId,
			player0: { ...player0, ...matchSummary.player0 },
			player1: { ...player1, ...matchSummary.player1 },
		}
	})

export const getSummarisedTennisDrawByPlayerName = (name, summariseTennisDraws) => {
	return summariseTennisDraws.filter((d) => d.player0.name === name || d.player1.name === name)
}

export const getPlayerTournamentStats = (name, draw) => {
	const totalGames = totalGamesPlayed(draw)
	const gamesWon = gamesWonByPlayerName(name, draw)
	const gamesLoss = totalGames - gamesWon

	return `${name} Stats: Games Won - ${gamesWon}, Games Loss - ${gamesLoss}`
}

export const getAllPlayerNames = (draw) => [
	...new Set(draw.reduce((acc, current) => [...acc, current.player0.name, current.player1.name], [])),
]
