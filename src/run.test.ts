import run, { UP, DOWN, ENTER } from 'inquirer-test'

const cliPath = `/Users/iankhor/Documents/app/tennis/build/index.js`

describe('selecting a menu', () => {
	it('does magic', async () => {
		const result = await run([cliPath], [DOWN])
		console.log(cliPath)
		console.log(result)
	})
})
