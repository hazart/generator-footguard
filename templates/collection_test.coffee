define [
	'collections/<%= fileName %>_collection'
], (<%  print(_.classify(fileName)); %>)->
	describe '<%  print(_.classify(fileName)); %> collection', ->
		it 'class is not undefined', () ->
			<%  print(_.classify(fileName)); %>.should.not.be.undefined