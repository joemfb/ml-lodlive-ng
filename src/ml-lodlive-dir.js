(function () {
  'use strict';

  angular.module('ml.lodlive')
    .directive('mlLodlive', [function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          iri: '=',
          profile: '='
        },
        template: '<div class="ml-lodlive"><ml-lodlive-legend></ml-lodlive-legend></div>',
        link: function($scope, $elem, $attrs) {

          $scope.$watch('parent.' + $attrs.iri, function(newVal, oldVal) {
            if (newVal) {
              angular.element($elem).lodlive({ profile: $scope.profile, firstUri: newVal, ignoreBnodes: true });
            }
          });

        },
      };
    }]);

}());
