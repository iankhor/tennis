import { cleanseData, getPlayersNames, serializeData } from './utils'

describe('cleanseData', () => {
	const data = 'Hello \r\n World \r\n  \r\n'

	it('splits data', () => {
		expect(cleanseData(data)).toHaveLength(3)
	})

	it('removes blanks', () => {
		const isBlankString = (string) => string.length === 0

		expect(cleanseData(data).filter(isBlankString).length).toEqual(0)
	})
})

describe('getPlayersNames', () => {
	const drawDescription = 'A vs B'

	it('return player names given their draw description', () => {
		expect(getPlayersNames(drawDescription)).toEqual({
			player0Name: 'A',
			player1Name: 'B',
		})
	})
})

describe('serializeData', () => {
	const matchOneData = ['Match: 01', 'Foo vs Bar', '1', '1', '1']
	const matchTwoData = ['Match: 02', 'La vs Ba', '0', '0', '0']
	const fileData = [...matchOneData, ...matchTwoData]

	it('serialized the raw data into a structured format', () => {
		expect(serializeData(fileData, 'Match')).toMatchObject([
			{
				matchId: '01',
				player0: { name: 'Foo' },
				player1: { name: 'Bar' },
			},
			{
				matchId: '02',
				player0: { name: 'La' },
				player1: { name: 'Ba' },
			},
		])
	})
})
