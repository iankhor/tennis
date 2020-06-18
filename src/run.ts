import inquirer from 'inquirer'
import fs from 'fs'
import { cleanseData, serializeData } from './lib/data/utils'
import { matchesForSelection, playersForSelection } from './utils'
import { summariseTennisDraws, getPlayerTournamentStats, getAllPlayerNames } from './lib/draws/utils'
import { getMatchResult } from './lib/matches/utils'
import { DEFAULT_TENNIS_DATA_FILE_PATH } from './config'

const filePath = process.argv[2] || DEFAULT_TENNIS_DATA_FILE_PATH
!process.argv[2] && console.log(`No filepath supplied, using ${DEFAULT_TENNIS_DATA_FILE_PATH}\n`)

const data = fs.readFileSync(filePath, { encoding: 'utf-8' })
const cleansedData = cleanseData(data)
const tennisDraws = serializeData(cleansedData, 'Match')
const summarisedTennisDraws = summariseTennisDraws(tennisDraws)

inquirer
	.prompt([
		{
			type: 'checkbox',
			message: 'Select queries for score for a particular match  (You can choose multiple)',
			name: 'queries.match',
			choices: [new inquirer.Separator('Query Match'), ...matchesForSelection(summarisedTennisDraws)],
		},
		{
			type: 'checkbox',
			message: 'Select queries games won vs lost for a particular player over the tournament (You can choose multiple)',
			name: 'queries.player',
			choices: [new inquirer.Separator('Query Player'), ...playersForSelection(summarisedTennisDraws)],
		},
	])
	.then((answers) => {
		const selectedMatches = answers['queries']['match']
		const selectedPlayers = answers['queries']['player']

		selectedMatches.forEach((id) => console.info(getMatchResult(id, summarisedTennisDraws)))
		selectedPlayers.forEach((name) => console.info(getPlayerTournamentStats(name, summarisedTennisDraws)))

		if (!selectedMatches.length && !selectedPlayers.length) {
			console.info('\n Nothing was selected')
		}
	})
