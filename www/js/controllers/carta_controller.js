angular.module('restoApp.controllers')

.controller('CartaCtrl', function($scope,Carta) {
  Carta.all($scope.$root.resto.id).then(function(response){
    $scope.categorias = response
  })
  
})