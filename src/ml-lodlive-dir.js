(function () {
  'use strict';

  angular.module('ml.lodlive')
    .directive('mlLodlive', [function () {
      return {
        restrict: 'E',
        controller: 'MLLodliveCtrl',
        replace: true,
        scope: {
          lodliveId: '@'
        },
        // TODO: get rid of id
        template: '<div id="mllodlive" class="graph"><ml-lodlive-legend></ml-lodlive-legend></div>'
      };
    }])
    .controller('MLLodliveCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var model = {
        graph: {}
      };

      if ($scope.lodliveId) {
        model.lodlive.id = $scope.lodliveId;
        // TODO: use link function, and $elem to get the right element. Directive could be used more often..
        jQuery('#mllodlive').lodlive(
          {
            profile: MarkLogicProfile,
            firstUri: model.lodlive.id
          }
        );
      }

      $scope.$watch('lodliveId', function(newVal, oldVal) {
        // TODO: use link function, and $elem to get the right element. Directive could be used more often..
        var lodliveObj = jQuery('#mllodlive').lodlive();
        model.lodlive.id = newVal;

        if (lodliveObj) {
          lodliveObj.context.empty();
          lodliveObj.init(model.lodlive.id);
        }

      }, true);

      angular.extend($scope, {
        model: model
      });
    }]);
}());
