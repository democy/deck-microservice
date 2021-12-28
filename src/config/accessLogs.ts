import { NextFunction, Request, Response } from 'express';
import {log} from '../log'

const accesslog = require('access-log')

export const accessLog = (req: Request, res: Response, next: NextFunction) => {
	const options = {
		userID: function (req: any) { return req.user; },
		format : 'url=:url method=:method statusCode=:statusCode delta=:delta ip=:ip userID=:userID logType=accessLogs'
	}
	accesslog(req, res, options, (Log: any) => {
		const splitted_val = Log.split(' ')
		const obj: any = {}
		splitted_val.forEach((item: any) => {
			const c = item.split('=');
			obj[c[0]] = isNaN(parseInt(c[1])) ? c[1] : parseInt(c[1])
		})
		log.info(obj);
	})
	return next();
}