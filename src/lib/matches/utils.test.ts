import { summariseMatch, getMatchResult } from './utils'
import { mockPointsForPlayer } from '../../../testlib/mocks'

describe('summariseMatch', () => {
	const points = mockPointsForPlayer({ playerId: 1, numberOfPoints: 4 })

	it('returns a summary of the match given a list of points', () => {
		expect(summariseMatch(points)).toMatchObject({
			matchWinner: null,
			player0: { games: 0, sets: 0 },
			player1: { games: 1, sets: 0 },
		})
	})
})

describe('getMatchResult', () => {
	describe('completed match', () => {
		const SummarisedMatchData = [
			{
				matchId: '01',
				player0: { name: 'Foo', games: 0, sets: 2 },
				player1: { name: 'Baz', games: 0, sets: 0 },
			},
		]

		it('returns a decription of the match outcome', () => {
			const description = getMatchResult('01', SummarisedMatchData)
			expect(description).toMatch(/Foo defeated Baz/)
			expect(description).toMatch(/2 sets to 0/)
		})
	})

	describe('match in progress', () => {
		const SummarisedMatchData = [
			{
				matchId: '01',
				player0: { name: 'Foo', games: 0, sets: 1 },
				player1: { name: 'Baz', games: 0, sets: 0 },
			},
		]

		it('returns a decription of the match outcome', () => {
			const description = getMatchResult('01', SummarisedMatchData)

			expect(description).toMatch(/\(Match In Progress\) Baz vs Foo/)
			expect(description).toMatch(/0 sets to 1/)
		})
	})
})
