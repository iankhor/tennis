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
