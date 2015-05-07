	angular.module('main')
					.factory('createWorkoutSvc', function (workoutPlanSvc, ExerciseData) {
										
		workoutPlanSvc.workoutPlan({
			name: "7minWorkout",
			title: "7 minites Workout",
			restBetweenExercise: 10
		});
		
		var exercise = function (args){
		this.name = args.name;
		this.title = args.title;
		this.description = args.description;
		this.image = args.image;
		this.related = {};
		this.related.videos = args.videos;
		this.nameSound = args.nameSound;
		this.procedure = args.procedure;
						}
		
		
	ExerciseData.data().forEach(function (exerciseplan){
			workoutPlanSvc.exercises.push({
			details: new exercise(exerciseplan), 
			duration:30	
		}); 
	});	
		
return workoutPlanSvc;
});

