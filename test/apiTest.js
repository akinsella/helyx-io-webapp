var request = require('supertest');
var mocha = require('mocha');
var should = require('should');

var server = require('../build/server.js');

describe('GET /api/me', function() {

	var httpServer;

	before(function(done) {
		httpServer = server.app.listen(server.app.get('port'), function() {
			done();
		});
	});

	after(function(done) {
		httpServer.close(function() {
			done();
		});
	});

	it('respond with json', function(done) {
		request(server.app)
			.get('/api/me')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(function(res) {
				res.body.should.be.an.Object;
			})
			.expect(200)
			.end(done);
	});

});