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

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server initialization and middlewares
 */
export const app: any = express()



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
 app.get(`/ping`, (_req: express.Request , res: express.Response) => {res.sendStatus(200)})
 
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
export const SERVER_PORT = parseInt(process.env.PORT || '3005')

export const server: Server = app.listen( SERVER_PORT, '', () => {
	log.debug('Server is running on port ', SERVER_PORT)
})

app.on('error', (err:any) => {
	if (err) log.error(err)
  });