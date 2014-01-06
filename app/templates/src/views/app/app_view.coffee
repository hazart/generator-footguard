define [
	'backbone'
	'underscore'
	'config'
	'text!templates/app/app.html'
	'css!templates/app/app.css'
], (Backbone, _, Config, tpl, css)->

	class App extends Backbone.View
		
		el: "#total"

		events: {}		
		
		initialize: (options)->

		render: ->
			@$el.html _.template( tpl, {  } )

	appView = new App()