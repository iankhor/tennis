import { summariseMatch } from './../matches/utils'

export const summariseTennisDraws = (draws) =>
	draws.map(({ matchId, player0, player1, pointsProgression }) => {
		const matchSummary = summariseMatch(pointsProgression)

		return {
			matchId,
			player0: { ...player0, ...matchSummary.player0 },
			player1: { ...player1, ...matchSummary.player1 },
		}
	})
