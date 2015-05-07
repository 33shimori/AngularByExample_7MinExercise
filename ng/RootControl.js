angular.module('main')
				.controller('rootCtrl', function ($scope, $modal){
					$scope.showWorkoutHistory = function () {
						var dialog = $modal.open({
							templateUrl: 'workout-history.jade',
							controller: workoutHistoryCtrl,
							size: 'lg'
						});
					};
					
				var workoutHistoryCtrl = 
								function ($scope, $modalInstance, workoutHistorySvc){
									$scope.search = {};
									$scope.search.completed = '';
									$scope.history = workoutHistorySvc.getHistory();
									
									$scope.ok = function () {
										$modalInstance.close();
									};
						};
				workoutHistoryCtrl['$inject'] =
								['$scope', '$modalInstance', 'workoutHistorySvc'];
});


