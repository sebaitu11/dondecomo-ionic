angular.module('restoApp.services')

.factory('Menus',['$q','$http',function($q,$http){
  return {
    all:function(restoId){
      var deferred = $q.defer()
      $http.get("http://localhost:3000/api/resto/" + restoId + "/menus.json" ,{cache:true})
          .success(function(response){
              deferred.resolve(response)
          })
          .error(function(){
              deferred.reject();
          })
      return deferred.promise;
    }
  }
}]);