"use strict";

export default function () {
  return {
    restrict: "E",
    scope: {
      aguOnDrop: "="
    },
    link: (scope, element, attrs) => {
      element.on("dragover", event => {
        event.preventDefault()
        element.addClass("agu-active");
      });
      element.on("dragleave", event => {
        event.preventDefault()
        element.removeClass("agu-active");
      });
      element.on("drop", event => {
        event.preventDefault()
        element.removeClass("agu-active");
        scope.aguOnDrop(event);
        scope.$apply();
      });
    }
  };
};