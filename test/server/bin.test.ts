import chaiHttp = require('chai-http');
import { request, expect, use } from 'chai';
import { server, app } from '../../src/bin/server';

use(chaiHttp)

describe('Microservice', function(): void {
	before( function(done: any): void {done()})
	after(function(done: any): void {done()})

	describe('sosafe - Standard: ', function(): void  {
		it('should return a 200 response', function(done: any): void {
			request(server).get(`${app.locals.baseUri}/ping`).then((data) => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
    })
})