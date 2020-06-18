import { MatchIndices, RawMatchData, MatchPlayers, FileData } from './../types'

export const cleanseData = (data: string): string[] => data.split('\r\n').filter(Boolean)

export const getPlayersNames = (players: string): MatchPlayers => {
	const playerNames = players.split('vs')

	return {
		player0Name: playerNames[0].trim(),
		player1Name: playerNames[1].trim(),
	}
}

export const serializeData = (data: FileData, dataSeperator: string): RawMatchData[] => {
	let matchIndices = [] as MatchIndices
	data.forEach((r: string, index: number) => {
		if (r.match(new RegExp(dataSeperator))) matchIndices.push(index)
	})

	const x = matchIndices.map((r, index, arr) => {
		const currentMatchRaw = data.slice(arr[index], arr[index + 1])

		const { player0Name, player1Name } = getPlayersNames(currentMatchRaw[1])

		return {
			matchId: currentMatchRaw[0].split(':')[1].trim(),
			player0: {
				name: player0Name,
			},
			player1: {
				name: player1Name,
			},
			pointsProgression: currentMatchRaw.slice(2),
		}
	})

	return x
}
