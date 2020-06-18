import { REGULAR_GAME_MAX_POINTS, TIEBREAK_POINT_THRESHOLD } from './../../config'
import { SummarisedMatchData, Score, RawScore, GameSummary, Player, GameEndIncides } from '../types'

const isTieBreaker = (p1Score: Score, p2Score: Score): boolean =>
	p1Score >= TIEBREAK_POINT_THRESHOLD && p2Score >= TIEBREAK_POINT_THRESHOLD

const isGameWon = (p1Score: Score, p2Score: Score): boolean => {
	if (isTieBreaker(p1Score, p2Score)) {
		return Math.abs(p1Score - p2Score) === 2
	} else {
		return p1Score === REGULAR_GAME_MAX_POINTS || p2Score === REGULAR_GAME_MAX_POINTS
	}
}

const gameWinner = (p1Score: Score, p2Score: Score): Player.One | Player.Two | null =>
	isGameWon(p1Score, p2Score) ? (p1Score > p2Score ? 0 : 1) : null

const findGameEndPointIndices = (points: RawScore[]): GameEndIncides => {
	let px = points

	const match = px.reduce(
		(acc, currentPt, index) => {
			let player0Score = acc.player0
			let player1Score = acc.player1
			let indexScore = [...acc.indexScore]

			if (currentPt === '0') {
				player0Score = player0Score + 1
			} else {
				player1Score = player1Score + 1
			}

			const isWon = isGameWon(player0Score, player1Score)
			if (isWon) {
				player0Score = 0
				player1Score = 0
				indexScore = [...acc.indexScore, index + 1]
			}

			return {
				player0: player0Score,
				player1: player1Score,
				gameWinner: gameWinner(player0Score, player1Score),
				indexScore,
			}
		},
		{
			player0: 0,
			player1: 0,
			indexScore: [0],
		}
	)

	return match
}

const summariseGame = (points: RawScore[]): GameSummary =>
	points.reduce(
		(acc, currentPt): any => {
			let player0Score = acc.player0
			let player1Score = acc.player1

			if ((currentPt as string) === '0') {
				player0Score = player0Score + 1
			} else {
				player1Score = player1Score + 1
			}

			const isWon = isGameWon(player0Score, player1Score)

			return {
				player0: player0Score,
				player1: player1Score,
				gameWinner: gameWinner(player0Score, player1Score),
				isGameWon: isWon,
			}
		},
		{
			player0: 0,
			player1: 0,
			gameWinner: null,
			isGameWon: false,
		}
	)

export const categorisePointsByGames = (points: RawScore[]): RawScore[][] => {
	return findGameEndPointIndices(points)
		.indexScore.map((i, index, arr) => points.slice(i, arr[index + 1]))
		.filter((x) => x.length)
}

export const summariseGames = (categorisedPoints: RawScore[][]): GameSummary[] =>
	categorisedPoints.map((cp) => summariseGame(cp))

export const gamesWonByPlayerId = (id: Player.One | Player.Two, games: GameSummary[]): number =>
	games.reduce((gamesWon, games) => (games.gameWinner === id ? gamesWon + 1 : gamesWon), 0)

export const gamesWonByPlayerName = (name: string, draw: SummarisedMatchData[]): number => {
	return draw.reduce((gamesWon, draw) => {
		let win = 0
		if (draw.player0.name === name) {
			win = gamesWon + draw.player0.games
		}
		if (draw.player1.name === name) {
			win = gamesWon + draw.player1.games
		}

		return win
	}, 0)
}

export const totalGamesPlayed = (draw: SummarisedMatchData[]): number => {
	return draw.reduce((count, draw) => count + draw.player0.games + draw.player1.games, 0)
}
