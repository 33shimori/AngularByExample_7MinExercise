angular.module('main')
				.factory('exerciseSvc', function () {
					return{
						exercise: function (args){
							this.name = args.name;
							this.title = args.title;
							this.description = args.description;
							this.image = args.image;
							this.related = {};
							this.related.videos = args.videos;
							this.nameSound = args.nameSound;
							this.procedure = args.procedure;
						}
			};		
});

