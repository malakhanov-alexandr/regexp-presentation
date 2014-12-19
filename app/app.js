angular.module('regexp', [
  'ngRoute',
  'regexp.exemples'
]).config(function ($sceProvider) {
  $sceProvider.enabled(false);
}).controller("MainCtrl", function ($scope, $location, $window, Exemples) {

  $scope.menu = $.map(Exemples, function (element, index) {
    return $.extend({link: index}, element);
  });

  $scope.exempleNames = $.map(Exemples, function (element, i) {
    return i;
  });

  var resultWatches = [];
  $scope.$on("$locationChangeSuccess", function () {
    var path = $location.path();
    if (!path || path === "/" || !Exemples[path]) {
      $location.path($scope.exempleNames[0]);
      return;
    }
    for (var i in resultWatches) {
      resultWatches[i]();
    }
    resultWatches = [];
    $window.scrollTo(0, 0);
    var exempleIndex = $.inArray(path, $scope.exempleNames);
    $scope.exempleName = path;
    $scope.exemple = Exemples[$scope.exempleName];
    $scope.nextExempleName = $scope.exempleNames[exempleIndex + 1];
    $scope.nextExemple = !$scope.nextExempleName ? null : Exemples[$scope.nextExempleName];
    $scope.prevExempleName = $scope.exempleNames[exempleIndex - 1];
    $scope.prevExemple = !$scope.prevExempleName ? null : Exemples[$scope.prevExempleName];

    for (var i in $scope.exemple.components) {
      var component = $scope.exemple.components[i];
      (function (component) {
        var update;

        resultWatches.push($scope.$watch("exemple.components[" + i + "].regexp", update));
        resultWatches.push($scope.$watch("exemple.components[" + i + "].input", update));
        resultWatches.push($scope.$watch("exemple.components[" + i + "].replace", update));
      })(component);
    }
  });
}).directive("fieldRow", function () {
  return {
    restrict: "A",
    transclude: true,
    templateUrl: function (elem, attrs) {
      return "partials/" + attrs.fieldRow + "-field-row.html";
    },
    scope: {
//      input: '@',
//      regexp: '@',
//      replace: '@',
      multiline: '@',
      tests: "="
    },
    link: function ($scope, elem, attrs) {
      $scope.input = elem.attr("data-input"); // because f***ing attrs/isolated_scope trims value like /\s(\S*)\s/
      $scope.regexp = elem.attr("data-regexp");
      $scope.replace = elem.attr("data-replace");
      var updateResult;
      switch (attrs.fieldRow) {
        case "match":
        {
          updateResult = function () {
            try {
              $scope.output = $scope.input.match(eval($scope.regexp));
              $scope.result = !!$scope.output;
//          if ($scope.tests) {
//            for (var j in $scope.tests) {
//              var test = $scope.tests[j];
//              test.result = test.input.match(eval($scope.regexp));
//              test.passed = !!test.result === test.expected;
//            }
//          }
              $scope.error = false;
            } catch (ex) {
              $scope.error = ex.message;
            }
          };
          break;
        }
        case "replace":
        {
          updateResult = function () {
            try {
              $scope.result = $scope.output = $scope.input.replace(eval($scope.regexp), $scope.replace);
              $scope.error = false;
            } catch (ex) {
              $scope.error = ex.message;
            }
          };
          break;
        }
      }
      $scope.$watch("input", updateResult);
      $scope.$watch("regexp", updateResult);
      $scope.$watch("replace", updateResult);
    }
  };
});
