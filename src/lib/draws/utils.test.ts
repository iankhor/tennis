import { getAllPlayerNames, summariseTennisDraws, getPlayerTournamentStats } from './utils'

describe('getAllPlayerNames', () => {
	const SummarisedMatchData = [
		{
			matchId: '01',
			player0: { name: 'Foo', games: 0, sets: 1 },
			player1: { name: 'Baz', games: 0, sets: 0 },
		},
		{
			matchId: '02',
			player0: { name: 'Holy', games: 0, sets: 1 },
			player1: { name: 'Baz', games: 0, sets: 0 },
		},
	]

	it('returns a uniqe set of player names', () => {
		expect(getAllPlayerNames(SummarisedMatchData)).toEqual(expect.arrayContaining(['Foo', 'Holy', 'Baz']))
	})
})

describe('summariseTennisDraws', () => {
	const rawMatchData = [
		{
			matchId: '99',
			player0: { name: 'Roger' },
			player1: { name: 'Rafa' },
			pointsProgression: ['1', '1', '0', '0', '1', '1'],
		},
	]

	it('returns a summary of a tennis match', () => {
		expect(summariseTennisDraws(rawMatchData)).toMatchObject([
			{
				matchId: '99',
				player0: { name: 'Roger', games: 0, sets: 0 },
				player1: { name: 'Rafa', games: 1, sets: 0 },
			},
		])
	})
})

describe('getPlayerTournamentStats', () => {
	const SummarisedMatchData = [
		{
			matchId: 'XY',
			player0: { name: 'Superman', games: 99, sets: 0 },
			player1: { name: 'Batman', games: 3, sets: 0 },
		},
		{
			matchId: 'BB',
			player0: { name: 'Superman', games: 1, sets: 0 },
			player1: { name: 'Aquaman', games: 5, sets: 0 },
		},
	]
	it('returns win loss states for a player', () => {
		expect(getPlayerTournamentStats('Superman', SummarisedMatchData)).toMatch(
			/Superman Games Stats: Won - 100, Lost - 8/
		)
	})
})
