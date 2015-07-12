'use strict';

angular.module('charityApp')
  .service('API', ['$http', function ($http) {
    return {
        uploadLogo: function(logo) {
            var formData = new FormData();
            formData.append("file", logo);
            return $http.post('/api/uploads', formData, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            });
        },
        getImage: function(file) {
            return $http.get('/api/images/' + file.filename, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })
        }
    };
}]);
