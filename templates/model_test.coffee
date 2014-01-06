define [
	'models/<%= fileName %>_model'
], (<%  print(_.classify(fileName)); %>)->
	describe '<%  print(_.classify(fileName)); %> model', ->
		it 'class is not undefined', () ->
			<%  print(_.classify(fileName)); %>.should.not.be.undefined