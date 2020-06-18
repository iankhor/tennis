/**
 * Types for players
 */

export type PlayerName = string
export type PlayerInfo = { name: PlayerName }
export type PlayerStats = { sets: number; games: number }
export enum Player {
	One = 0,
	Two = 1,
}

/**
 * Types for games
 */
export type RawScore = string
export type Score = number
export type Game = number

export type GameSummary = {
	player0: Score
	player1: Score
	gameWinner: number | null
	isGameWon: boolean
}

export type GameEndIncides = {
	player0: Game
	player1: Game
	indexScore: Game[]
}

/**
 * Types for sets
 */
export type Set = number

export type MatchPlayers = {
	player0Name: string
	player1Name: string
}

export type SetEndIncides = {
	player0Games: number
	player1Games: number
	indexGames: number[]
}

export type SetSummary = {
	player0: number
	player1: number
	setWinner: number | null
	isSetWon: boolean
}

/**
 * Types related to matches
 */
export type MatchId = string
export type MatchIndices = number[]

export type MatchStats = {
	games: Game
	sets: Set
}

export type MatchSummary = {
	matchWinner: Player.One | Player.Two | null
	player0: MatchStats
	player1: MatchStats
}

export type RawMatchData = {
	matchId: string
	player0: PlayerInfo
	player1: PlayerInfo
	pointsProgression: RawScore[]
}

export type SummarisedMatchData = {
	matchId: string
	player0: PlayerInfo & PlayerStats
	player1: PlayerInfo & PlayerStats
}

/**
 * Misc types
 */
export type FileData = string[]
export type PromptSelection = { name: string }
