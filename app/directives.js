(function() {
  angular
    .module("app")
    .directive("aguDragAndDrop", aguDragAndDrop);

  function aguDragAndDrop() {
    return {
      restrict: "E",
      scope: {
        aguDragleave: "=",
        aguDragover: "=",
        aguDrop: "="
      },
      link: (scope, element, attrs) => {
        element.on("dragleave", event => {
          event.preventDefault()
          scope.aguDragleave(event);
          scope.$apply();
        });
        element.on("dragover", event => {
          event.preventDefault()
          scope.aguDragover(event);
          scope.$apply();
        });
        element.on("drop", event => {
          event.preventDefault()
          scope.aguDrop(event);
          scope.$apply();
        });
      }
    };
  }
})();