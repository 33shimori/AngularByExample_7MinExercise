angular.module('main')
				.factory('workoutHistorySvc', function ($rootScope, appEvents, localStorageService){
					var maxHistoryItems = 20,
								storageKey = "workouthistory", 
								workoutHistory = localStorageService.get(storageKey) || [];
					var currentWorkoutLog = null;
					var service = {};
					
					service.startTracking = function (){
						currentWorkoutLog = { 
							startedOn: new Date().toISOString(),
							completed: false,
							exercisesDone: 0
						};
						if (workoutHistory.length >= maxHistoryItems){
							workoutHistory.shift();
						}
						workoutHistory.push(currentWorkoutLog);
						localStorageService.add(storageKey, workoutHistory);
					};
					
					service.endTracking = function (completed){
						currentWorkoutLog.completed = completed;
						currentWorkoutLog.endedOn = new Date().toISOString();
						currentWorkoutLog = null;
						localStorageService.add(storageKey, workoutHistory);
					};
					
					service.getHistory = function () {
						return workoutHistory;
					}
					
					$rootScope.$on("$routeChangeSuccess", function (e, args){
						if (currentWorkoutLog) {
							service.endTracking(false); 
							// End the current tracking if in progress the route changes.

						}
					});
					$rootScope.$on(appEvents.workout.exercisesStarted, function (e, args){
						currentWorkoutLog.lastExercise = args.title;
						++currentWorkoutLog.exercisesDone;
						localStorageService.add(storageKey, workoutHistory);
					});
					
					return service;
})
