define [
	'backbone'<% if( model ) { %>
	'models/<%= modelName %>_model'<% } %>
], (Backbone<% if( model ) { print(", " + _.classify(modelName)); } %>)->
	
	class <%= _.classify(name) %>Collection extends Backbone.Collection
		<% if( model ) { %>
		model: <%= _.classify(modelName) %>
		<% } %>