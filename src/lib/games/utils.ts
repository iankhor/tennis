import { REGULAR_GAME_MAX_POINTS, TIEBREAK_POINT_THRESHOLD, GAMES_FOR_SET_WIN } from './../../config'

const isTieBreaker = (p1Score, p2Score) => p1Score >= TIEBREAK_POINT_THRESHOLD && p2Score >= TIEBREAK_POINT_THRESHOLD

const isGameWon = (p1Score, p2Score) => {
	if (isTieBreaker(p1Score, p2Score)) {
		return Math.abs(p1Score - p2Score) === 2
	} else {
		return p1Score === REGULAR_GAME_MAX_POINTS || p2Score === REGULAR_GAME_MAX_POINTS
	}
}

const gameWinner = (p1Score, p2Score) => (isGameWon(p1Score, p2Score) ? (p1Score > p2Score ? 0 : 1) : null)

const findGameEndPoint = (points) => {
	let px = points

	const match = px.reduce(
		(acc, currentPt: number, index): any => {
			let player0Score = acc.player0
			let player1Score = acc.player1
			let indexScore = [...acc.indexScore]

			if (currentPt === 0) {
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

export const categorisePointsByGames = (points) => {
	return findGameEndPoint(points).indexScore.map((i, index, arr) => points.slice(i, arr[index + 1]))
}

const summariseGame = (points) =>
	points.reduce(
		(acc, currentPt: number): any => {
			let player0Score = acc.player0
			let player1Score = acc.player1

			if (currentPt === 0) {
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

export const summariseGames = (categorisedPoints) => categorisedPoints.map((cp) => summariseGame(cp))

export const gamessWonByPlayer = (id, games) =>
	games.reduce((gamesWon, games) => (games.gameWinner === id ? gamesWon + 1 : gamesWon), 0)

export const getGamesWon = (name, draw) => {
	return draw.reduce((gamesWon, draw) => {
		let games = 0
		if (draw.player0.name === name) {
			games = gamesWon + draw.player0.games
		}
		if (draw.player1.name === name) {
			games = gamesWon + draw.player1.games
		}

		return `\n ${games} [INSERT LOSS COUNT]`
	}, 0)
}
