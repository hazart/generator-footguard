define [
	'backbone'
	'underscore'
	'config'
	'text!templates/app/app.html'
], (Backbone, _, Config, tpl)->

	class App extends Backbone.View
		
		el: "#total"

		events: {}		
		
		initialize: (options)->

		render: ->
			@$el.html _.template( tpl, {  } )

	appView = new App()