import { GAMES_FOR_SET_WIN } from './../../config'
import { GameSummary, SetSummary, Player, Set, SetEndIncides } from '../types'

const setWinner = (player0Sets: Set, player1Sets: Set): Player.One | Player.Two | null =>
	isSetWon(player0Sets, player1Sets) ? (player0Sets > player1Sets ? 0 : 1) : null

const isSetWon = (player0Set: Set, player1Set: Set): boolean =>
	player0Set === GAMES_FOR_SET_WIN || player1Set === GAMES_FOR_SET_WIN

const findSetEndGame = (gamesSummary: GameSummary[]): SetEndIncides => {
	return gamesSummary.reduce(
		(acc, currentGameSummary, index): any => {
			let player0Sets = acc.player0Sets
			let player1Sets = acc.player1Sets
			let indexSets = [...acc.indexSets]

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
				indexSets = [...acc.indexSets, index + 1]
			}

			return {
				player0Sets,
				player1Sets,
				indexSets,
			}
		},
		{
			player0Sets: 0,
			player1Sets: 0,
			indexSets: [0],
		}
	)
}

export const summariseSets = (summaries: GameSummary[][]): SetSummary[] =>
	summaries.map((set) => {
		const player0Sets = set.reduce((acc, set) => (set.gameWinner === 0 ? acc + 1 : acc), 0)
		const player1Sets = set.reduce((acc, set) => (set.gameWinner === 1 ? acc + 1 : acc), 0)

		return {
			player0: player0Sets,
			player1: player1Sets,
			setWinner: setWinner(player0Sets, player1Sets),
			isSetWon: isSetWon(player0Sets, player1Sets),
		}
	})

export const categoriseGamesBySets = (summarisedGames: GameSummary[]): GameSummary[][] =>
	findSetEndGame(summarisedGames).indexSets.map((i, index, arr) => summarisedGames.slice(i, arr[index + 1]))

export const setsWonByPlayer = (id: Player.One | Player.Two, set) =>
	set.reduce((setsWon, set) => (set.setWinner === id ? setsWon + 1 : setsWon), 0)
