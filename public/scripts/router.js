////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var helyxApp = angular.module('helyxApp');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Run
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

helyxApp.run(function($rootScope, UsersApiService) {

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/// Root scope event listeners
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

		console.log("toState: " + JSON.stringify(toState));

		if (!$rootScope.currentUser && ( !toState.data || toState.data.requireLogin === undefined || toState.data.requireLogin ) ) {
			UsersApiService.me().then(function (me) {
				console.log("User is authenticated - me: " + JSON.stringify(me));
			}).catch(function (err) {
				console.log("User is not authenticated - Err: " + JSON.stringify(err));
				location.href = '/#/login';
			});
		}

	});

});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Config
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

helyxApp.config(function ($stateProvider) {

	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			views: {
				header: {
					templateUrl: 'views/header.html'
				},
				'': {
					templateUrl: 'views/dashboard.html',
					controller: 'DashboardCtrl'
				}
			},
			data: {
				requireLogin: true
			}
		})

		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl',
			data: {
				requireLogin: false
			}
		})

		.state('logout', {
			url: '/logout',
			templateUrl: 'views/logout.html',
			controller: 'LogoutCtrl',
			data: {
				requireLogin: false
			}
		})

		.state('change-password', {
			url: '/password/change?token',
			templateUrl: 'views/change-password.html',
			controller: 'ChangePasswordCtrl',
			data: {
				requireLogin: false
			}
		})

		// if none of the above states are matched, use this as the fallback
		.state("otherwise", {
			url: "*path",
			template: "",
			controller: [
				'$timeout','$state',
				function($timeout,  $state ) {
					$timeout(function() {
						$state.go('dashboard');
					}, 0);
				}]
		});
});

helyxApp.config(function ($sceDelegateProvider) {

	// whitelist urls
	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		'http://localhost:9000/**',
		'http://helyx.io/**',
		'https://helyx.io/**'
	]);

});
