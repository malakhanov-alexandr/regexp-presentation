
angular.module('regexp', [
  'ngRoute',
  'regexp.exemples'
]).controller("MainCtrl", function ($scope, $sce, $location, Exemples) {

  $scope.exempleNames = $.map(Exemples, function (element, i) {
    return i;
  });

  for (var i in Exemples) {
    if (Exemples[i].text) {
      Exemples[i].text = $sce.trustAsHtml(Exemples[i].text);
    }
  }

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

    var exempleIndex = $.inArray(path, $scope.exempleNames);
    $scope.exemple = Exemples[path];
    $scope.nextExempleName = $scope.exempleNames[exempleIndex + 1];
    $scope.nextExemple = !$scope.nextExempleName ? null : Exemples[$scope.nextExempleName];
    $scope.prevExempleName = $scope.exempleNames[exempleIndex - 1];
    $scope.prevExemple = !$scope.prevExempleName ? null : Exemples[$scope.prevExempleName];

    for (var i in $scope.exemple.components) {
      var component = $scope.exemple.components[i];
      (function (component) {
        var update;
        switch (component.type) {
          case "match":
          {
            update = function () {
              try {
                component.output = component.input.match(eval(component.regexp));
                component.result = !!component.output;
                if(component.tests) {
                  for(var j in component.tests) {
                    var test = component.tests[j];
                    test.result = test.input.match(eval(component.regexp));
                    test.passed = !!test.result === test.expected;
                  }
                }
                component.error = false;
              } catch (ex) {
                component.error = ex.message;
              }
            };
            break;
          }
          case "replace":
          {
            update = function () {
              try {
                component.result = component.output = component.input.replace(eval(component.regexp), component.replace);
                component.error = false;
              } catch (ex) {
                component.error = ex.message;
              }
            };
            break;
          }
        }
        resultWatches.push($scope.$watch("exemple.components[" + i + "].regexp", update));
        resultWatches.push($scope.$watch("exemple.components[" + i + "].input", update));
        resultWatches.push($scope.$watch("exemple.components[" + i + "].replace", update));
      })(component);
    }

  });

});
