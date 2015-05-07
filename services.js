/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Factory 
 */
angular.module("customServices", [])
				.factory("logFactory", function (){
					var messageCount = 0;
					return{
					log: function (msg) {
				console.log("(LOG +" + messageCount++ + ") " + msg);
				}
					};
});


/*
 * Service
 */

angular.module("customServices", [])
				.service("logService", function (){
					return{
						messgeCount: 0,
						log: function (msg){
							console.log("(LOG +" + this.messageCount++ + ") " + msg);
						}
					};
})