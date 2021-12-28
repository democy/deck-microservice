
import { Cards, connection, Deck, DeckToCards } from '../../database';
import { log } from '../../log';
import { CardsData , createQuery} from './interfaces'


const DeckFacade = {
	createCards: async () => {
		try {
			const suits = ["SPADES", "DAIMONDS", "CLUBS", "HEARTS"];
			const values = ["ACE", "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING"];
			const CardsData: CardsData[] = []
			for (const suit of suits) {
				for (const value of values) {
					const cardData:CardsData = {
						value,
						suit,
						code: `${value[0]}${suit[0]}`

					}
					CardsData.push(cardData)
				}
			}
			await connection
				.createQueryBuilder()
				.insert()
				.into(Cards)
				.values(CardsData)
				.execute();
			return CardsData;
		} catch (err: any) {
			// log.error('Error in creating a new Cards:', err.stack,err.code );
			throw err;
		}
	},
	
	createDeck: async (data: any) => {
		const { type, shuffled } = data
		// const CardsRepository = connection.getRepository(Cards);
		try {
			const deck: createQuery = {
				type,
				shuffled
			}
			const remaining: number = type === 'FULL' ? 52 : 36
			const { raw } = await connection
				.createQueryBuilder()
				.insert()
				.into(Deck)
				.values(deck)
				.execute();


			const CardsData: CardsData[] = await connection.getRepository(Cards).find({ take :remaining})

			if (shuffled) {

				for (let i = 0; i < 500; i++) {
					let location1 = Math.floor((Math.random() * CardsData.length));
					let location2 = Math.floor((Math.random() * CardsData.length));
					let tmp = CardsData[location1];

					CardsData[location1] = CardsData[location2];
					CardsData[location2] = tmp;
				}
			}

			const cardsToDeck:any[] = CardsData.map((card: CardsData, i: number) => ({ deckId: (raw[0].id as any), cardId: (card as any).id, deckposition: i + 1, seen: false }))

			// const { raw: inserted } = 
			await connection
				.createQueryBuilder()
				.insert()
				.into(DeckToCards)
				.values(cardsToDeck)
				.execute();
			return {
					"deckId": raw[0].id,
					type,
					shuffled,
					remaining
				// raw[0]
			};
		} catch (err) {
			log.error('Error in creating a new Cards:', (err as any).stack);
			throw err;
		}

	},

	getCards: async (data: any) => {
		const { count, deck } = data
		// const CardsRepository = connection.getRepository(Cards);
		try {				
				const CardsData: CardsData[] = await connection.getRepository(DeckToCards).
				query(`with data as (  
					select c.* from deck_to_cards as dc inner join cards as c on dc."cardId" = c.id where
				   "deckId" = '${deck}' and seen=false
				   order by deckposition desc limit ${count}
				   )
					 select json_agg(data.*) as cards from data `)

					 await connection.getRepository(DeckToCards).
					 query(`
					 UPDATE deck_to_cards 
					 SET seen=true
				   WHERE id in ( select id from deck_to_cards  where
				   "deckId" = '${deck}' and seen=false
				   order by deckposition desc limit ${count})
						 `)	 

			return CardsData
		} catch (err) {
			log.error('Error in creating a new Cards:', (err as any).stack);
			throw err;
		}

	},

	getDeck: async (data: any) => {
		const { deckId } = data

		console.log(deckId);
		
		// const CardsRepository = connection.getRepository(Cards);
		try {				
				const CardsData: CardsData[] = await connection.getRepository(DeckToCards).
				query(`with data as (  
					select c.* from deck_to_cards as dc 
					inner join cards as c on dc."cardId" = c.id 
					where
				   "deckId" = '${deckId}' and seen=false
				   order by deckposition ASC
				   )
					 select json_agg(data.*) as cards from data`)	
					 
					 const DeckInfo = await connection.getRepository(DeckToCards).
					 query(`select * from deck where id = '${deckId}'`)	
					 const {cards} = CardsData[0] as any
					 console.log(DeckInfo);
					 const {type,shuffled} = DeckInfo[0] as any
			return {deckId,remaining: cards.length, type,shuffled, cards}
		} catch (err) {
			log.error('Error in creating a new Cards:', (err as any).stack);
			throw err;
		}

	}
}
export { DeckFacade };