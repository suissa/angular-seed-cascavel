(function(){

  'use strict';

  angular.module('BeerServiceModule', [])
  .service('BeerService', BeerService)
  ;

  function BeerService($http) {
    var urlBase = '//localhost:3000/beers';

    this.items = [];
    this.find = function() {
      return $http.get(urlBase);
    };

    this.get = function(id) {
      return $http.get(urlBase + '/' + id);
    };

    this.create = function(data) {
        return $http.post(urlBase, data);
    };

    this.update = function(data) {
        return $http.put(urlBase + '/' + data._id, data);
    };

    this.remove = function(data) {
        return $http.delete(urlBase + '/' + data._id, data);
    };
  };
  BeerService.$inject = ['$http'];

})();