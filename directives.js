/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('customDirectives', ["customServices"])
				.directive("triButton", function (logService){
					return{
						scope: { counter: "=counter"},
		link: function (scope, element, attrs){
			element.on("click", function (event){
				new logService.log("Button click: " + event.target.innerText);
				scope.$apply(function (){
					scope.counter++;
				});
			});
		}
					};
});
