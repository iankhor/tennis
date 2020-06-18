import { Player, RawScore } from '../src/lib/types'

type mockPointsForPlayerProps = {
	playerId: Player.One | Player.Two
	numberOfPoints: number
}

export const mockPointsForPlayer = ({ playerId, numberOfPoints }: mockPointsForPlayerProps): RawScore[] => {
	let points = [] as RawScore[]
	for (let i = 0; i < numberOfPoints; i++) {
		points.push(playerId.toString())
	}

	return points
}

export const mockGameWinForPlayer = (id) => ({
	player0: id ? 0 : 4,
	player1: id ? 4 : 0,
	gameWinner: id,
	isGameWon: true,
})
