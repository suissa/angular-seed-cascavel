'use strict';

angular.module('myApp.Beers', ['ngRoute', 'BeerServiceModule'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/beers', {
      templateUrl: 'modules/beers/list.html',
      controller: 'BeersList'
    })
    .when('/beers/create', {
      templateUrl: 'modules/beers/create.html',
      controller: 'BeersCreate'
    })
    .when('/beers/:id', {
      templateUrl: 'modules/beers/get.html',
      controller: 'BeersGet'
    })
    ;
}])

.controller('BeersList', BeersList)
.controller('BeersGet', BeersGet)
.controller('BeersCreate', BeersCreate);

BeersList['$inject'] = ['$scope', 'BeerService'];
BeersCreate['$inject'] = ['$scope', 'BeerService'];
BeersGet['$inject'] = ['$scope', 'BeerService', '$routeParams'];

function BeersList($scope, BeerService) {
  $scope.reverse = true;
  $scope.predicate = 'name';

  $scope.ordenar = function(predicado){
    $scope.reverse = !$scope.reverse;
    $scope.predicate = predicado;
  }

  function success(result) {
    console.log(result);
    $scope.beers = result.data
  };

  function error(err) {
    console.log(err);
  };

  BeerService.find().then(success, error);

  // REMOVER CERVEJA

  $scope.remove = function(beer) {
    var _beer = beer;
    function success(result) {
      alert('Cerveja ' + _beer.name + ' removida com sucesso!');
    }
    function error(result) {
      alert('DEU RUIM!')
    }
    if(confirm('Deseja mesmo remover a cerveja '+ beer.name +'?')) {
      var index = $scope.beers.indexOf(beer);
      $scope.beers.splice(index, 1);
      return BeerService.remove(beer).then(success, error);
    }
    return alert('Ainda bem.');
  };
}

function BeersGet($scope, BeerService, $routeParams) {
  var id = $routeParams.id;
  function success(result) {
    console.log(result);
    $scope.beer = result.data
  };

  function error(err) {
    console.log(err);
  };

  BeerService.get(id).then(success, error);
}


function BeersCreate($scope, BeerService) {


  function success(result) {
    console.log(result);
    $scope.beers = result.data
  };

  function error(err) {
    console.log(err);
  };

  function create(beer) {
    BeerService.create(beer).then(success, error);
  }
  $scope.create = create;
}






