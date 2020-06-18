import { GAMES_FOR_SET_WIN } from './../../config'
import { GameSummary, SetSummary, Player, Game, SetEndIncides } from '../types'

const setWinner = (player0Games: Game, player1Games: Game): Player.One | Player.Two | null =>
	isSetWon(player0Games, player1Games) ? (player0Games > player1Games ? 0 : 1) : null

const isSetWon = (player0Games: number, player1Games: number): boolean =>
	player0Games === GAMES_FOR_SET_WIN || player1Games === GAMES_FOR_SET_WIN

const findSetEndGame = (gamesSummary: GameSummary[]): SetEndIncides => {
	return gamesSummary.reduce(
		(acc, currentGameSummary, index): any => {
			let player0Games = acc.player0Games
			let player1Games = acc.player1Games
			let indexGames = [...acc.indexGames]

			if (currentGameSummary.gameWinner === 0) {
				player0Games = player0Games + 1
			}
			if (currentGameSummary.gameWinner === 1) {
				player1Games = player1Games + 1
			}

			const isWon = isSetWon(player0Games, player1Games)
			if (isWon) {
				player0Games = 0
				player1Games = 0
				indexGames = [...acc.indexGames, index + 1]
			}

			return {
				player0Games,
				player1Games,
				indexGames,
			}
		},
		{
			player0Games: 0,
			player1Games: 0,
			indexGames: [0],
		}
	)
}

export const summariseSets = (summaries: GameSummary[][]): SetSummary[] =>
	summaries.map((games) => {
		const player0Games = games.reduce((count, game) => (game.gameWinner === 0 ? count + 1 : count), 0)
		const player1Games = games.reduce((count, game) => (game.gameWinner === 1 ? count + 1 : count), 0)

		return {
			player0: player0Games,
			player1: player1Games,
			setWinner: setWinner(player0Games, player1Games),
			isSetWon: isSetWon(player0Games, player1Games),
		}
	})

export const categoriseGamesBySets = (summarisedGames: GameSummary[]): GameSummary[][] =>
	findSetEndGame(summarisedGames).indexGames.map((i, index, arr) => summarisedGames.slice(i, arr[index + 1]))

export const setsWonByPlayer = (id: Player.One | Player.Two, set: SetSummary[]): number =>
	set.reduce((setsWon, set) => (set.setWinner === id ? setsWon + 1 : setsWon), 0)
