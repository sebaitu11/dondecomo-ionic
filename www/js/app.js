
angular.module('restoApp', ['ionic','ngCordova','angular-data.DSCacheFactory','restoApp.controllers', 'restoApp.services', 'restoApp.directives','ngImgCache'])

.run(function($ionicPlatform,DSCacheFactory,$http,$cordovaGeolocation,$rootScope) {
  
  ImgCache.options.debug = false;
  ImgCache.options.chromeQuota = 50*1024*1024;        
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  navigator.geolocation.getCurrentPosition(function(pos) {
    console.log("ubicacion obtenida")
    $rootScope.lat  = pos.coords.latitude
    $rootScope.long = pos.coords.longitude
  }, function(error) {
    console.log("error")
  })

  ImgCache.init(function() {
      console.log('ImgCache init: success!');
  }, function(){
      console.log('ImgCache init: error! Check the log for errors');
  });
  
  DSCacheFactory('defaultCache', {
        maxAge: 200000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 6000000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });

    $http.defaults.cache = DSCacheFactory.get('defaultCache');


    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  })
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  $httpProvider.defaults.headers.common['Authorization'] = 'Token token=2da9fc9ad75a5f371403394ed7ddc8ec';
  
  $httpProvider.interceptors.push('XSRFInterceptor')
  
  $stateProvider

    // setup an abstract state for the tabs directive
    // .state('tab', {
    //   url: "/tab",
    //   abstract: true,
    //   templateUrl: "templates/tabs.html"
    // })

    // Each tab has its own nav history stack:

    .state('barrios', {
      url: '/barrios',
      views: {
        'tab-restos': {
          templateUrl: 'templates/tab-barrios.html',
          controller: 'BarriosCtrl'
        }
      }
    })
    .state('restos', {
      url: '/barrio/:barrioId',
      views: {
        'tab-restos': {
          templateUrl: 'templates/tab-restos.html',
          controller: 'RestosCtrl'
        }
      }
    })
    .state('restos-detail', {
      url: '/resto/:id',
      views: {
        'tab-restos': {
          templateUrl: 'templates/resto-detail.html',
          controller: 'RestoDetailCtrl'
        }
      }
    })
    .state('tab.carta', {
      url: '/carta',
      views: {
        'tab-carta': {
          templateUrl: 'templates/tab-carta.html',
          controller: 'CartaCtrl'
        }
      }
    })
    .state('tab.platos', {
      url: '/platos/:categoryId',
      views: {
        'tab-carta': {
          templateUrl: 'templates/tab-platos.html',
          controller: 'PlatosCtrl'
        }
      }
    })
    .state('tab.menu', {
      url: '/menu',
      views: {
        'tab-menu': {
          templateUrl: 'templates/tab-menu.html',
          controller: 'MenuCtrl'
        }
      }
    })
    .state('tab.promos', {
      url: '/promos',
      views: {
        'tab-promo': {
          templateUrl: 'templates/tab-promociones.html',
          controller: 'PromosCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/barrios');

});

