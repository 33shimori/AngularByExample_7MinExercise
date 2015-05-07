angular.module('main')
				.controller('workoutVideoCtrl', function ($scope, $modal){
		$scope.playVideo = function (videoId){
			$scope.pauseWorkout();
			var dialog = $modal.open({
				templateUrl: 'youtube-modal', 
				controller: videoPlayerCtrl,
				scope: $scope.$new(true),
				resolve: {
				video: function (){
						return '//www.youtube.com/embed/' + videoId;
					}
				},
				size: 'lg'
					}).result['finally'](function (){
						$scope.resumeWorkout();
					});
				};
				var videoPlayerCtrl = function ($scope, $modalInstance, video){
					$scope.video = video;
					$scope.ok = function (){
						$modalInstance.close();
					};
				};
				videoPlayerCtrl['$inject'] = ['$scope', '$modalInstance', 'video'];				
				var init = function() {
				};
				init();
		});