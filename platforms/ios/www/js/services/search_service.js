angular.module('restoApp.services')

.factory('Search',['$q','$http',function($q,$http){
  return {
    search:function(text,position){
      var deferred = $q.defer()
       $http({url : "http://damp-sands-5383.herokuapp.com/resto/" + text + ".json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})
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