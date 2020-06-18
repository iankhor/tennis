import run, { DOWN, ENTER } from 'inquirer-test'

const SPACEBAR = '\x20'

// This spec requires a rerun of jest as it relies on node and the latest compiled run.js
const runPath = `/Users/iankhor/Documents/app/tennis/build/run.js`
const mockTournamentFilePath = `${process.cwd()}/testlib/fixtures/mock_tournament.txt`

test('the app runs', async () => {
	const result = await run([runPath, mockTournamentFilePath], [DOWN])

	expect(result).toMatch(new RegExp('Query Match', 'g'))
})

test('getting the match result and games won and loss in tournament', async () => {
	const result = await run(
		[runPath, `${process.cwd()}/testlib/fixtures/mock_tournament.txt`],
		[SPACEBAR, ENTER, DOWN, SPACEBAR, ENTER]
	)

	expect(result).toMatch(new RegExp('Person X defeated Person Y', 'g'))
	expect(result).toMatch(new RegExp('2 sets to 1', 'g'))
	expect(result).toMatch(new RegExp('Person X Stats: Games Won - 12, Games Loss - 6', 'g'))
})
