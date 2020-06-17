type MatchIndices = number[]

type MatchData = {
	matchId: string
	player0: { name: string }
	player1: { name: string }
	pointsProgression: string[]
}

type MatchUpDescription = string
type MatchPlayers = {
	player0Name: string
	player1Name: string
}

export const cleanseData = (data: string) => data.split('\r\n').filter(Boolean)

export const getPlayersNames = (players: MatchUpDescription): MatchPlayers => {
	const x = players.split('vs')

	return {
		player0Name: x[0].trim(),
		player1Name: x[1].trim(),
	}
}

export const serializeData = (data: string[], dataSeperator: string): MatchData[] => {
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
