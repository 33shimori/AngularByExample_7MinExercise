angular.module('main')
				.config(function ($routeProvider){
					$routeProvider
						.when('/start', {templateUrl:'start.jade'})
						.when('/workout',{templateUrl: 'workout.jade', controller: 'WorkoutCtrl'})
						.when('/finish', {templateUrl: 'finish.jade'})
						.otherwise({
						redirectTo: '/start'
					});
});

