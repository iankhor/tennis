import { MIN_SETS_FOR_MATCH_WIN } from './../../config'

import { categorisePointsByGames, summariseGames, gamesWonByPlayerId } from './../games/utils'
import { summariseSets, categoriseGamesBySets, setsWonByPlayer } from './../sets/utils'

const isMatchCompleted = (setWonByPlayer0, setWonByPlayer1) =>
	setWonByPlayer0 >= MIN_SETS_FOR_MATCH_WIN || setWonByPlayer1 >= MIN_SETS_FOR_MATCH_WIN

export const matchWinner = (setWonByPlayer0, setWonByPlayer1) =>
	isMatchCompleted(setWonByPlayer0, setWonByPlayer1) ? (setWonByPlayer0 >= MIN_SETS_FOR_MATCH_WIN ? 0 : 1) : undefined

export const summariseMatch = (points) => {
	const categorisedPoints = categorisePointsByGames(points)
	const summarisedGames = summariseGames(categorisedPoints)

	const categorisedSets = categoriseGamesBySets(summarisedGames)
	const summarisedSets = summariseSets(categorisedSets)

	const gamesWonByPlayer0 = gamesWonByPlayerId(0, summarisedGames)
	const gamesWonByPlayer1 = gamesWonByPlayerId(1, summarisedGames)

	const setWonByPlayer0 = setsWonByPlayer(0, summarisedSets)
	const setWonByPlayer1 = setsWonByPlayer(1, summarisedSets)

	return {
		matchWinner: matchWinner(setWonByPlayer0, setWonByPlayer1),
		player0: {
			games: gamesWonByPlayer0,
			sets: setWonByPlayer0,
		},
		player1: {
			games: gamesWonByPlayer1,
			sets: setWonByPlayer1,
		},
	}
}

export const getMatchResult = (matchId, summarisedDraw) => {
	const { player0, player1 } = summarisedDraw.find((d) => d.matchId === matchId)

	const winnerPlayer = matchWinner(player0.sets, player1.sets)

	const winnerName = winnerPlayer === 0 ? player0.name : player1.name
	const winnerSets = winnerPlayer === 0 ? player0.sets : player1.sets

	const runenrUpName = winnerPlayer === 0 ? player1.name : player0.name
	const runnerUpSets = winnerPlayer === 0 ? player1.sets : player0.sets

	const completed = isMatchCompleted(player0.sets, player1.sets)
	const verb = completed ? 'defeated' : 'vs'
	const matchProgressMessage = completed ? '' : '(Match In Progress) '

	return `${matchProgressMessage}${winnerName} ${verb} ${runenrUpName}\n ${winnerSets} sets to ${runnerUpSets} \n`
}
