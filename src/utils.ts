import { getAllPlayerNames } from './lib/draws/utils'
import { SummarisedMatchData, PromptSelection } from './lib/types'

export const matchesForSelection = (draw: SummarisedMatchData[]): PromptSelection[] =>
	draw.map((d) => ({ name: `Score Match ${d.matchId}`, value: d.matchId }))

export const playersForSelection = (draw: SummarisedMatchData[]): PromptSelection[] =>
	getAllPlayerNames(draw).map((p) => ({ name: `Games Player ${p}`, value: p }))
