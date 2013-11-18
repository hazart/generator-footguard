define [
	'backbone'
	'views/app/app_view'
	'config'
], (Backbone, appView, Config)->

	class Router extends Backbone.Router

		routes:
			'' 							: 'home'
			'*actions' 					: 'home'

		initialize: ()->
			appView.render()
			@bind 'route', @_trackPageview
			# Pour utiliser pushstate il faudrait que requirejs génère des balises scripts avec des sources en /
			Backbone.history.start( {pushState: false} )

		home: (profil)->
			# console.log 'HOME'
			# @goto view: 'views/home/home_view', callback: (view)->

		goto: ({view, options, callback})->
			if @views[view]?
				callback.apply(@views[view]) if callback
			else
				@loadView(view, options, callback)

		loadView: (view, options, callback) ->
			return if @views[view]?
			require [view], (View)=>
				@views[view] = new View(options)
				callback.apply(@views[view]) if callback

		_trackPageview: (e)->
			url = Backbone.history.getFragment()
			ga('send', {'hitType':'pageview','page':url}) unless Config.flagDev
			# console.log "Trackin ::> /#{url}"
