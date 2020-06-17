import inquirer from 'inquirer'
import fs from 'fs'

// inquirer
// 	.prompt([
// 		{
// 			type: 'checkbox',
// 			message: 'Select queries to run (You can choose multiple)',
// 			name: 'queries',
// 			choices: [
// 				new inquirer.Separator('Queries'),
// 				{
// 					name: 'Score Match <id maybe insert id based on file>',
// 				},
// 				{
// 					name: 'Games Player <make this dyamic player names>',
// 				},
// 			],
// 			validate: function (answer) {
// 				if (answer.length < 1) {
// 					return 'You must select at least one query'
// 				}

// 				return true
// 			},
// 		},
// 	])
// 	.then((answers) => {
// 		console.log(JSON.stringify(answers, null, '  '))
// 	})

import path from 'path'
const filename = path.resolve(__dirname, '../data', 'full_tournament.txt')

const cleanseData = (data: string) => data.split('\r\n').filter(Boolean)

const data = fs.readFileSync(filename, { encoding: 'utf-8' })
const cleansedData = cleanseData(data)

type MatchIndices = number[]

type MatchData = {
	matchId: string
	player0: string
	player1: string
	pointsProgression: string[]
}

type MatchUpDescription = string
type MatchPlayers = {
	player0: string
	player1: string
}

const getPlayers = (players: MatchUpDescription): MatchPlayers => {
	const x = players.split('vs')

	return {
		player0: x[0],
		player1: x[1],
	}
}

const serializeData = (data: string[], dataSeperator: string): MatchData[] => {
	let matchIndices = [] as MatchIndices
	data.forEach((r: string, index: number) => {
		if (r.match(new RegExp(dataSeperator))) matchIndices.push(index)
	})

	const x = matchIndices.map((r, index, arr) => {
		const currentMatchRaw = data.slice(arr[index], arr[index + 1])

		const { player0, player1 } = getPlayers(currentMatchRaw[1])

		return {
			matchId: currentMatchRaw[0],
			player0,
			player1,
			pointsProgression: currentMatchRaw.slice(2),
		}
	})

	return x
}

const x = serializeData(cleansedData, 'Match')

enum GameState {
	InPlay = 'P',
	Game = 'G',
	Deuce = 'D',
	Advantage = 'A',
}

type GameResult = {
	gameId: number
	player1: number
	player2: number
	result: GameState
}

type MatchResult = {
	matchId: number
	score: GameResult[]
}

const REGULAR_GAME_MAX_POINTS = 4
const TIEBREAK_POINT_THRESHOLD = 3

const isTieBreaker = (p1Score, p2Score) => p1Score >= TIEBREAK_POINT_THRESHOLD && p2Score >= TIEBREAK_POINT_THRESHOLD

const isGameWon = (p1Score, p2Score) => {
	if (isTieBreaker(p1Score, p2Score)) {
		return Math.abs(p1Score - p2Score) === 2
	} else {
		return p1Score === REGULAR_GAME_MAX_POINTS || p2Score === REGULAR_GAME_MAX_POINTS
	}
}

const gameWinner = (p1Score, p2Score) => (isGameWon(p1Score, p2Score) ? (p1Score > p2Score ? 0 : 1) : null)

const player0FakerPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const player1FakerPoints = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const points = [...player0FakerPoints, ...player1FakerPoints, ...player0FakerPoints]

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

const GAMES_FOR_SET_WIN = 6
const MIN_SETS_FOR_MATCH_WIN = 2

const isSetWon = (player0Set, player1Set) => player0Set === GAMES_FOR_SET_WIN || player1Set === GAMES_FOR_SET_WIN

const findSetEndGame = (gamesSummary) => {
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

const gamesPoints = findGameEndPoint(points).indexScore.map((i, index, arr) => points.slice(i, arr[index + 1]))
const gamesSummary = gamesPoints.map((gp) => summariseGame(gp))
const setPoints = findSetEndGame(gamesSummary).indexGames.map((i, index, arr) => gamesSummary.slice(i, arr[index + 1]))

const setWinner = (player0Sets, player1Sets) =>
	isSetWon(player0Sets, player1Sets) ? (player0Sets > player1Sets ? 0 : 1) : null

const setSummary = setPoints.map((set) => {
	const player0Sets = set.reduce((acc, set) => (set.gameWinner === 0 ? acc + 1 : acc), 0)
	const player1Sets = set.reduce((acc, set) => (set.gameWinner === 1 ? acc + 1 : acc), 0)

	return { player0: player0Sets, player1: player1Sets, setWinner: setWinner(player0Sets, player1Sets), isSetWon: isWon }
})

const setWonByPlayer0 = setSummary.reduce((setsWon, set) => (set.setWinner === 0 ? setsWon + 1 : setsWon), 0)
const setWonByPlayer1 = setSummary.reduce((setsWon, set) => (set.setWinner === 1 ? setsWon + 1 : setsWon), 0)

const isMatchCompleted = (setWonByPlayer0, setWonByPlayer1) =>
	setWonByPlayer0 >= MIN_SETS_FOR_MATCH_WIN || setWonByPlayer1 >= MIN_SETS_FOR_MATCH_WIN

const matchWinner = (setWonByPlayer0, setWonByPlayer1) =>
	isMatchCompleted(setWonByPlayer0, setWonByPlayer1) ? (setWonByPlayer0 >= MIN_SETS_FOR_MATCH_WIN ? 0 : 1) : undefined

console.log(gamesSummary)
console.log(setSummary)
console.info('matchWinnder', matchWinner(setWonByPlayer0, setWonByPlayer1))
