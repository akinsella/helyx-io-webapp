////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var helyxApp = angular.module('helyxApp');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Factory
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


helyxApp.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('pink')
		.accentPalette('blue-grey')
		.dark();
});

helyxApp.factory('Globals', function($rootScope) {

	var globals =  {
		date: moment().format("YYYY-MM-DD"),
		baseURL: window.location.protocol + '//' + window.location.host,
		distance: 1000,
		DEFAULT_POSITION: { latitude: 48.859377, longitude: 2.331751 }
	};


	var urlParams = {};

	(function () {
		var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);

		while (match = search.exec(query))
			urlParams[decode(match[1])] = decode(match[2]);
	})();

	if (urlParams.lat && urlParams.lon) {
		globals.qsPosition = { coords: { latitude: Number(urlParams.lat), longitude: Number(urlParams.lon) } };
	}

	if (urlParams.distance) {
		globals.distance = Number(urlParams.distance);
	}

	if (urlParams.date) {
		globals.date = urlParams.date;
	}

	globals.selectAgencies = function(agencies) {
		globals.agencies = agencies;

		if (!globals.position && globals.agencies && globals.agencies.length > 0) {
			globals.position = {
				coord: {
					latitude: (global.agencies[0].min_lat + global.agencies[0].max_lat) / 2,
					longitude: (global.agencies[0].min_lon + global.agencies[0].max_lon) / 2
				}
			};
		}

		$rootScope.$broadcast('agencies', globals.agencies);
	};


	globals.setPosition = function(position) {
		globals.position = position;

		$rootScope.$broadcast('position', position);
	};


	console.log("Globals: " + JSON.stringify(globals));


	return globals;
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Controllers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

helyxApp.controller('DialogCtrl', function($rootScope, $scope, $state) {

});

helyxApp.controller('AppCtrl', function($rootScope, $scope, $state, $mdDialog, UsersApiService) {

	$scope.logout = function() {
		console.log("Clicked on logout!");
		UsersApiService.logout().then(function() {
			location.href = '/?#/login';
		}).catch(function(err) {
			console.log("Failed to logout ! - Err: " + JSON.stringify(err));
		});
	};

	$scope.showAdd = function(ev) {
		$mdDialog.show({
			controller: 'DialogCtrl',
			template: '<md-dialog aria-label="User Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
			targetEvent: ev,
		}).then(function(answer) {
			$scope.alert = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.alert = 'You cancelled the dialog.';
		});
	};

});

helyxApp.controller('IndexCtrl', function($rootScope, $scope, $state) {

});
