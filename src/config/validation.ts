import * as JOI from 'joi';

const validationSchema = {
	createDeck: {
		body: {
			type: JOI.array().items(JOI.string().valid(['FULL', 'SHORT'])).single().allow(''),
			shuffled: JOI.boolean().required()
		}
	},
	drawCard: {
		query: {
			count: JOI.number().min(1).required(),
			deck: JOI.string().required()
		}
	},
	openDeck: {
		query: {
			deckId: JOI.string().uuid().required()
		}
	}

	// Joi.string().guid().required()
	
}

export { validationSchema };