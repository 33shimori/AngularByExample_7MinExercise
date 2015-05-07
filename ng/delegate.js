'use strict';

angular.module('main')
				.config(function ($sceDelegateProvider){
					$sceDelegateProvider.resourceUrlWhitelist(
						// allow some origin resource loads.
		['self', 'http://*.youtube.com/**']);
});


