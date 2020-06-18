import { getAllPlayerNames } from './lib/draws/utils'

export const matchesForSelection = (draw) => draw.map((d) => ({ name: `Score Match ${d.matchId}`, value: d.matchId }))

export const playersForSelection = (draw) =>
	getAllPlayerNames(draw).map((p) => ({ name: `Games Player ${p}`, value: p }))
