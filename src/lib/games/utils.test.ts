import {
	categorisePointsByGames,
	summariseGames,
	gamesWonByPlayerId,
	gamesWonByPlayerName,
	totalGamesPlayed,
} from './utils'

import { mockPointsForPlayer } from './../../../testlib/mocks'

describe('categorisePointsByGames', () => {
	// 4 straight points for a plyer is 1 game
	const points = mockPointsForPlayer({ playerId: 0, numberOfPoints: 8 })

	it('returns a game summary give a list of raw scores', () => {
		expect(categorisePointsByGames(points)).toEqual([
			['0', '0', '0', '0'],
			['0', '0', '0', '0'],
		])
	})
})

describe('summariseGames', () => {
	describe('deuce games', () => {
		const deuce = ['1', '1', '1', '0', '0', '0', '0', '0']

		it('return a summary', () => {
			expect(summariseGames([deuce])).toEqual([
				{
					player0: 5,
					player1: 3,
					gameWinner: 0,
					isGameWon: true,
				},
			])
		})
	})

	describe('straight games', () => {
		it('return a summary', () => {
			const straight = ['1', '1', '1', '1']

			expect(summariseGames([straight])).toEqual([
				{
					player0: 0,
					player1: 4,
					gameWinner: 1,
					isGameWon: true,
				},
			])
		})
	})

	describe('games in progress', () => {
		it('return a summary', () => {
			const inProgress = ['1', '1']

			expect(summariseGames([inProgress])).toEqual([
				{
					player0: 0,
					player1: 2,
					gameWinner: null,
					isGameWon: false,
				},
			])
		})
	})
})

describe('gamesWonByPlayerId', () => {
	const gamesSummary = [
		{
			player0: 0,
			player1: 0,
			gameWinner: 0,
			isGameWon: true,
		},
		{
			player0: 0,
			player1: 0,
			gameWinner: 1,
			isGameWon: true,
		},
		{
			player0: 0,
			player1: 0,
			gameWinner: 0,
			isGameWon: true,
		},
		{
			player0: 0,
			player1: 0,
			gameWinner: null,
			isGameWon: false,
		},
	]

	it('return games won by a player one', () => {
		expect(gamesWonByPlayerId(0, gamesSummary)).toEqual(2)
	})

	it('return games won by a player two', () => {
		expect(gamesWonByPlayerId(1, gamesSummary)).toEqual(1)
	})

	it('return nothing when a player id does not exist', () => {
		expect(gamesWonByPlayerId(99, gamesSummary)).toEqual(0)
	})
})

describe('game statistics', () => {
	const summariesMatchData = [
		{
			matchId: '88',
			player0: { name: 'Colonel', games: 7, sets: 0 },
			player1: { name: 'McDonalds', games: 9, sets: 1 },
		},
	]

	describe('gamesWonByPlayerName', () => {
		it('return games won given a player name', () => {
			expect(gamesWonByPlayerName('Colonel', summariesMatchData)).toEqual(7)
			expect(gamesWonByPlayerName('McDonalds', summariesMatchData)).toEqual(9)
		})
	})

	describe('totalGamesPlayed', () => {
		it('return games played in a match', () => {
			expect(totalGamesPlayed(summariesMatchData)).toEqual(16)
		})
	})
})
