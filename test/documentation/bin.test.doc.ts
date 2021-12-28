import chaiHttp = require('chai-http');
import { request, expect, use } from 'chai';

use(chaiHttp)

describe('Microservices', function(): void {
	before( function(done: any): void {done()})
	after(function(done: any): void {done()})

	describe('sosafe - Standard: ', function(): void  {
		it('should return a 200 response', function(done: any): void {
			request(`http://localhost:${process.env.PORT || 3002}${process.env.BASE_URI || '/api/v1/microservice'}`).get('/ping').then((data) => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
		it('should return the solution blueprint', function(done: any): void {
			request(`http://localhost:${process.env.PORT || 3002}${process.env.BASE_URI || '/api/v1/microservice'}`).get('/blueprint').then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
		it('should return the solution code documentation', function(done: any): void {
			request(`http://localhost:${process.env.PORT || 3002}${process.env.BASE_URI || '/api/v1/microservice'}`).get('/documentation').then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
		it('should return the solution code test suite', function(done: any): void {
			request(`http://localhost:${process.env.PORT || 3002}${process.env.BASE_URI || '/api/v1/microservice'}`).get('/tests').then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		})
	})
})