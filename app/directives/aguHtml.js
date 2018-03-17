"use strict";

function aguHtml() {
  return {
    restrict: "E",
    link: (scope, element, attrs) => {
      element.html(attrs.value);
    }
  };
}

export default aguHtml;