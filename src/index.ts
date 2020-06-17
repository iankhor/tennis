import path from 'path'
import inquirer from 'inquirer'
import fs from 'fs'
import { cleanseData, serializeData } from './lib/data/utils'
import { summariseTennisDraws } from './lib/draws/utils'
import { getMatchResult } from './lib/matches/utils'
import { getGamesWon } from './lib/games/utils'

const filename = path.resolve(__dirname, '../data', 'full_tournament.txt')

const data = fs.readFileSync(filename, { encoding: 'utf-8' })
const cleansedData = cleanseData(data)

const tennisDraws = serializeData(cleansedData, 'Match')

const summarisedTennisDraws = summariseTennisDraws(tennisDraws)

const queryMatchChoices = summarisedTennisDraws.map((d) => {
	return {
		name: `Score Match ${d.matchId}`,
		value: d.matchId,
	}
})

const allPlayers = [
	...new Set(summarisedTennisDraws.reduce((acc, current) => [...acc, current.player0.name, current.player1.name], [])),
]

const queryGamesPlayer = allPlayers.map((p) => {
	return {
		name: `Games Player ${p}`,
		value: p,
	}
})

inquirer
	.prompt([
		{
			type: 'checkbox',
			message: 'Select queries for score for a particular match  (You can choose multiple)',
			name: 'queries.match',
			choices: [new inquirer.Separator('Query Match'), ...queryMatchChoices],
			validate: function (answer) {
				if (answer.length < 1) {
					return 'You must select at least one query'
				}

				return true
			},
		},
		{
			type: 'checkbox',
			message: 'Select queries games won vs lost for a particular player over the tournament (You can choose multiple)',
			name: 'queries.player',
			choices: [new inquirer.Separator('Query Player'), ...queryGamesPlayer],
			validate: function (answer) {
				if (answer.length < 1) {
					return 'You must select at least one query'
				}

				return true
			},
		},
	])
	.then((answers) => {
		answers['queries']['match'].forEach((id) => console.info(getMatchResult(id, summarisedTennisDraws)))
		// BUG HERE: must provide summarisedTennisDraws with draws that player C is involed in
		answers['queries']['player'].forEach((name) => console.info(getGamesWon(name, summarisedTennisDraws)))
	})
