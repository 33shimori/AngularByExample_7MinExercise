angular.module('main')
				.controller('WorkoutCtrl', 
	function(appEvents, workoutHistorySvc, createWorkoutSvc, exerciseSvc, $scope, $interval, $location){						
				
	var exerciseIntervalPromise;			
	var restExercise;
	var fillImages = function (){
		$scope.exerciseImages = [];
		angular.forEach($scope.workoutPlan.exercises, function (exercise, index){
			$scope.exerciseImages.push(exercise.details.image);
			if(index < $scope.workoutPlan.exercises.length - 1)
				$scope.exerciseImages.push("images/rest.png");
		});
	}
	var startWorkout = function(){
		$scope.workoutPlan = createWorkoutSvc;
		$scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();
		exerciseSvc.exercise({
				name: "rest",
				title: " Relax!", 
				desciption: " Relax a bit!",
				image: "images/rest.png",
				procedure: ""
			});
		restExercise = {
			details: exerciseSvc,
			duration: $scope.workoutPlan.restBetweenExercise,
		};

		workoutHistorySvc.startTracking();
		$scope.currentExerciseIndex= -1;
		fillImages();
		startExercise($scope.workoutPlan.exercises[0]);		
	};
	var startExercise = function (exercisePlan) {
			$scope.currentExercise = exercisePlan;
			$scope.currentExerciseDuration = 0;
				if (exercisePlan.details.name != 'rest'){
						$scope.currentExerciseIndex++;
						$scope.$emit(appEvents.workout.exercisesStarted, exercisePlan.details);
				};
				exerciseIntervalPromise = startExerciseTimeTracking();
		};
					
	var startExerciseTimeTracking = function () {
						var promise = $interval(function (){
								++$scope.currentExerciseDuration;
								--$scope.workoutTimeRemaining;
						}, 1000, $scope.currentExercise.duration -
										$scope.currentExerciseDuration);
						promise.then(function () {
			var next = getNextExercise($scope.currentExercise, $scope, restExercise);
			if(next) {
				$scope.carousel.next();
					startExercise(next, $scope);
				} else {
					workoutComplete();
			}});
					return promise					
			};
		
	var getNextExercise =function (currentExercisePlan){
				var nextExercise = null;
				if(currentExercisePlan === restExercise){
					nextExercise = $scope.workoutPlan.exercises[$scope.currentExerciseIndex + 1];
				} else {
					if ($scope.currentExerciseIndex < $scope.workoutPlan.exercises.length -1){
						nextExercise = restExercise;
					}
				}
				return nextExercise;
			};										
	var workoutComplete = function () {
		workoutHistorysvc.endTracking(true);
		$location.path('/finish');
	};
	
	$scope.pauseWorkout = function (){
		$interval.cancel(exerciseIntervalPromise);
		$scope.workoutPaused = true;
	};
	$scope.resumeWorkout = function (){
		exerciseIntervalPromise = startExerciseTimeTracking();
		$scope.workoutPaused = false;
	};
	$scope.pauseResumeToggle = function (){
		if($scope.workoutPaused){
			$scope.resumeWorkout();
		} else {
			$scope.pauseWorkout();
		}
	};
	$scope.onKeyPressed = function (event){
		if(event.which == 80 || event.which ==112)  // 'p' or 'P'
			{$scope.pauseResumeToggle();
		}
	};
	$scope.imageUpdated = function (imageIndex){
		console.log($scope.exerciseImages[imageIndex]);
	};

	var init = function (){
		startWorkout();
	};
	init();		
});

