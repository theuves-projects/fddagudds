"use strict";

export default function () {
  return {
    restrict: "E",
    link: (scope, element, attrs) => {
      element.html(attrs.value);
    }
  };
};