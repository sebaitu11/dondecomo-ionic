angular.module('restoApp.services')
.factory('Restos',['$q','$http','PageState',function($q,$http,PageState){

  var Restos = {};

  Restos.getData = function(restoId){
    var deferred = $q.defer()
    self = this;
    $http({url : "https://dondecomo.herokuapp.com/restos/" + restoId + "/data.json",method: "GET",cache:true})
        .success(function(response){
            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },

  Restos.all = function(page){
    var deferred = $q.defer()
    self = this;
    $http({url : "https://dondecomo.herokuapp.com/restos/get_restos.json",method: "GET",params: {page : page},cache:true})
        .success(function(response){
            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },

  Restos.getWithPosition = function(position,page){
    var deferred = $q.defer()
    self = this;
    $http({url : "https://dondecomo.herokuapp.com/restos/get_restos.json",method: "GET",params: { lat: position[0], lng: position[1],page : page},cache:true})
        .success(function(response){
            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  },
  Restos.get = function(restoId,position){
   var deferred = $q.defer()
    $http({url : "https://dondecomo.herokuapp.com/api/resto/" + restoId + ".json",method: "GET",params: { lat: position[0], lng: position[1]},cache:true})
        .success(function(response){
            deferred.resolve(response)
        })
        .error(function(){
            deferred.reject();
        })
    return deferred.promise;
  }
  return Restos
}]);
