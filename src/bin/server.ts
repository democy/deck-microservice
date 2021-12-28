import express = require('express')
import * as dotenv from 'dotenv'
dotenv.config()

//////////////////////////////////////////////////////////////////////////////////////////////////
// bin Server requirements
//////////////////////////////////////////////////////////////////////////////////////////////////
import { json } from 'body-parser'
import { Server } from 'http'
import { log } from '../log'
import { accessLog } from '../config/accessLogs'
import { deckRouter} from '../collections'

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server initialization and middlewares
 */
export const app: any = express()
app.locals.title = 'decks api'
app.locals.email = 'm.kashi.khan93@gmail.com'
app.locals.issues = 'https://github.com/democy/deck-microservice/issues'
app.locals.baseUri = process.env.BASE_URI || '/api/v1/deck-api'


app.use(json())
app.use((_req: express.Request, res: express.Response, next: express.NextFunction): void => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	next()
})

app.use('*', accessLog)
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server routing (Application)
 */
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server routing (Standard)
 */
 app.get(`${app.locals.baseUri}/ping`, (_req: express.Request , res: express.Response) => {res.sendStatus(200)})
 app.use(`${app.locals.baseUri}/blueprint`, express.static('docs/blueprint/', {extensions : ['html'], index : 'index.html'}))
 app.use(`${app.locals.baseUri}/documentation`, express.static('docs/typedoc/', {extensions : ['html'], index : 'index.html'}))
 app.use(`${app.locals.baseUri}/tests`, express.static('docs/tests/', {extensions : ['html'], index : 'index.html'}))
 app.use(`${app.locals.baseUri}/`, deckRouter());
 
/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Error handling and logging
 */

const errorHandler: express.ErrorRequestHandler = (error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction ): void => {
	log.error(error)
	res.send(500)

	if ( process.env.ENV === 'development' )
		res.send(error)
	else
		res.end()
}

app.use(errorHandler)

/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Launch server
 */
export const SERVER_PORT = parseInt(process.env.PORT || '3006')

export const server: Server = app.listen( SERVER_PORT, '', () => {
	log.debug('Server is running on port ', SERVER_PORT)
})

app.on('error', (err:any) => {
	if (err) log.error(err)
  });