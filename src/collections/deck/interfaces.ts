export interface CardsData {
	// id: string
	value: string
	suit: string
	code: string
}
export interface createQuery {
	type: string,
	shuffled: boolean
}

export interface drawCard {
	count: number,
	deck: string
}

export interface openDeck {
	deckId: string
}


export interface CardsToDeck {
	deckId: string,
	cardId: string,
	deckposition: number,
	seen: boolean
}

