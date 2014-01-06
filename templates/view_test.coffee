describe 'Test <%= _.classify(name) %> view', ->

	it 'Should...', (done) ->
		browser = @browser
		browser.get('http://localhost:9001/')
		.nodeify(done)
		
