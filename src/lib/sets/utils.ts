import { GAMES_FOR_SET_WIN } from './../../config'

export const isSetWon = (player0Set, player1Set) => player0Set === GAMES_FOR_SET_WIN || player1Set === GAMES_FOR_SET_WIN

export const findSetEndGame = (gamesSummary) => {
	return gamesSummary.reduce(
		(acc, currentGameSummary, index): any => {
			let player0Sets = acc.player0Sets
			let player1Sets = acc.player1Sets
			let indexGames = [...acc.indexGames]

			if (currentGameSummary.gameWinner === 0) {
				player0Sets = player0Sets + 1
			}
			if (currentGameSummary.gameWinner === 1) {
				player1Sets = player1Sets + 1
			}

			const isWon = isSetWon(player0Sets, player1Sets)
			if (isWon) {
				player0Sets = 0
				player1Sets = 0
				indexGames = [...acc.indexGames, index + 1]
			}

			return {
				player0Sets,
				player1Sets,
				indexGames,
			}
		},
		{
			player0Sets: 0,
			player1Sets: 0,
			indexGames: [0],
		}
	)
}

const setWinner = (player0Sets, player1Sets) =>
	isSetWon(player0Sets, player1Sets) ? (player0Sets > player1Sets ? 0 : 1) : null

export const summariseSets = (setPoints) =>
	setPoints.map((set) => {
		const player0Sets = set.reduce((acc, set) => (set.gameWinner === 0 ? acc + 1 : acc), 0)
		const player1Sets = set.reduce((acc, set) => (set.gameWinner === 1 ? acc + 1 : acc), 0)

		return {
			player0: player0Sets,
			player1: player1Sets,
			setWinner: setWinner(player0Sets, player1Sets),
			isSetWon: isSetWon(player0Sets, player1Sets),
		}
	})

export const categoriseGamesBySets = (categorisedGames) =>
	findSetEndGame(categorisedGames).indexGames.map((i, index, arr) => categorisedGames.slice(i, arr[index + 1]))

export const setsWonByPlayer = (id, set) =>
	set.reduce((setsWon, set) => (set.setWinner === id ? setsWon + 1 : setsWon), 0)
