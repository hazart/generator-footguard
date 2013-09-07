define [
	'backbone'
	'underscore'<% if( tpl ) { %>
	'text!templates/<% if( folder ) { print(folder +"/"); } %><%= fileName %>.html'<% } %><% if( model ) { %>
	'models/<%= fileName %>_model'<% } %>
], (Backbone, _<% if( tpl ) { print(', tpl'); } %><% if( model ) { print(', ' + _.classify(fileName)); } %>)->

	class <%= _.classify(name) %>View extends Backbone.View
		
		events: {}
		<% if( model ) { %>
		model: new <%= _.classify(model) %>()<% } %>
		
		initialize: (options)->
			<% if( model ) { %>if options.model?
				@model = model<% } %>
			
		render: ->
			<% if( tpl ) { %>@$el.html _.template( tpl, { <% if( model ) { %>model: @model<% } %> } )<% } %>