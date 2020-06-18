import path from 'path'

/**
 * Constants for the tennis match calculator
 */

export const DEFAULT_TENNIS_DATA_FILE_PATH = path.join(process.cwd(), 'data', 'full_tournament.txt')
export const REGULAR_GAME_MAX_POINTS = 4 //Non tie break games
export const TIEBREAK_POINT_THRESHOLD = 3
export const GAMES_FOR_SET_WIN = 6
export const MIN_SETS_FOR_MATCH_WIN = 2
