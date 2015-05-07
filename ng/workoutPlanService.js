angular.module('main')
				.factory('workoutPlanSvc', function () {
				return {
					workoutPlan: function (args){
		this.exercises = [];
		this.name = args.name;
		this.title = args.title;
		this.restBetweenExercise = args.restBetweenExercise;					
		this.totalWorkoutDuration = function(){
			if (this.exercises.length == 0) return 0;
			var total = 0;
			angular.forEach(this.exercises, function(exercise){
				total = total + exercise.duration;
			});
			return this.restBetweenExercise * (this.exercises.length -1) + total;
		}	
					}
			};
			
});

	
