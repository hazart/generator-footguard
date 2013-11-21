define [
	'backbone'
	'views/app/app_view'
	'config'
], (Backbone, appView, Config)->

	class Router extends Backbone.Router

		routes:
			'' 							: 'home'
			'*actions' 					: 'home'

		views : {}

		initialize: ()->
			appView.render()
			@bind 'route', @_trackPageview
			# To use pushstate require should call scripts with an url that start with /
			Backbone.history.start( {pushState: false} )

		home: ()->
			# console.log 'HOME'
			# I.e. : If you add a home view
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
