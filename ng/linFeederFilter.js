angular.module('main')
				.filter('lineFeederFltr', function (){
					return function (input){
						var text;
										text = input.replace(/\./g, ".<br/>");
										
						return text;
					}
})