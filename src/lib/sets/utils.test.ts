import { summariseSets, categoriseGamesBySets, setsWonByPlayer } from './utils'

import { mockGameWinForPlayer } from './../../../testlib/mocks'

describe('categoriseGamesBySets', () => {
	const gamesSummary = [
		mockGameWinForPlayer(0),
		mockGameWinForPlayer(0),
		mockGameWinForPlayer(1),
		mockGameWinForPlayer(0),
		mockGameWinForPlayer(1),
		mockGameWinForPlayer(1),
		mockGameWinForPlayer(1),
		mockGameWinForPlayer(1),
		mockGameWinForPlayer(1),
		mockGameWinForPlayer(0),
		mockGameWinForPlayer(0),
		mockGameWinForPlayer(0),
	]

	it('categorises sets', () => {
		expect(categoriseGamesBySets(gamesSummary)).toEqual([
			[
				mockGameWinForPlayer(0),
				mockGameWinForPlayer(0),
				mockGameWinForPlayer(1),
				mockGameWinForPlayer(0),
				mockGameWinForPlayer(1),
				mockGameWinForPlayer(1),
				mockGameWinForPlayer(1),
				mockGameWinForPlayer(1),
				mockGameWinForPlayer(1),
			],
			[mockGameWinForPlayer(0), mockGameWinForPlayer(0), mockGameWinForPlayer(0)],
		])
	})
})

describe('summariseSets', () => {
	const categoriseGamesBySets = [
		[
			mockGameWinForPlayer(1),
			mockGameWinForPlayer(1),
			mockGameWinForPlayer(1),
			mockGameWinForPlayer(1),
			mockGameWinForPlayer(1),
			mockGameWinForPlayer(1),
		],
		[mockGameWinForPlayer(1), mockGameWinForPlayer(0)],
	]

	it('summaries games in terms of sets', () => {
		expect(summariseSets(categoriseGamesBySets)).toMatchObject([
			{
				player0: 0,
				player1: 6,
				setWinner: 1,
				isSetWon: true,
			},
			{
				player0: 1,
				player1: 1,
				setWinner: null,
				isSetWon: false,
			},
		])
	})
})

describe('setsWonByPlayer', () => {
	const setSummary = [
		{
			player0: 0,
			player1: 0,
			setWinner: 1,
			isSetWon: true,
		},
		{
			player0: 0,
			player1: 0,
			setWinner: 0,
			isSetWon: true,
		},
		{
			player0: 0,
			player1: 0,
			setWinner: 1,
			isSetWon: true,
		},
	]

	it('returns sets won by a player given its id', () => {
		expect(setsWonByPlayer(0, setSummary)).toEqual(1)
		expect(setsWonByPlayer(1, setSummary)).toEqual(2)
	})
})
