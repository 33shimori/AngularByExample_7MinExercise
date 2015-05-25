angular.module('main')
				.directive('owlCarousel', function ($compile, $timeout){
					var owl = null;
	return{
		scope: { options: '=', source: '=', onUpdate: '&'},
		link: function (scope, element, attr){
			var defaultOptions = { 
				singleItem: true, 
				pagenation: false,
				afterAction: function() {
			var itemIndex = this.currentItem;
			scope.$evalAsync(function(){
				scope.onUpdate({ currentItemIndex: itemIndex });
			})
		}
			};
			if (scope.options)
				angular.extend(defaultOptions, scope.options);
			scope.$watch("source", function(newValue){
				if(newValue){
					$timeout(function (){
						owl = element.owlCarousel(defaultOptions);
					}, 0);
				}
			});
		},
		controller:function ($scope, $attrs){
			if($attrs.owlCarousel) $scope.$parent[$attrs.owlCarousel]= this;
			this.next = function () { owl.trigger('owl.next');};
		this.previous = function () { owl.trigger('owl.prev');};
		}
	}
})
