angular.module('restoApp.services')

.factory('Promos',['$q','$http',function($q,$http){
  return {
    all:function(restoId){
      var deferred = $q.defer()
      $http.get("http://localhost:3000/api/resto/" + restoId + "/promos.json",{cache:true} )
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