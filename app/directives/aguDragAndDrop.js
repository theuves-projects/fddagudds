"use strict";

function aguDragAndDrop() {
  return {
    restrict: "E",
    scope: {
      aguOnDrop: "="
    },
    link: (scope, element, attrs) => {
      const text = angular
        .element(`<span class="dragAndDrop__text"></span>`)
        .text(attrs.aguMsgDefault);

      element.append(text);

      element.on("dragover", event => {
        event.preventDefault()
        element.addClass("dragAndDrop--active");
        text.text(attrs.aguMsgDragover);
      });

      element.on("dragleave", event => {
        event.preventDefault()
        element.removeClass("dragAndDrop--active");
        text.text(attrs.aguMsgDefault);
      });

      element.on("drop", event => {
        event.preventDefault()
        element.addClass("cur--progress");
        element.removeClass("dragAndDrop--active");
        text.text(attrs.aguMsgOnDrop);

        const isOk = scope.aguOnDrop(event);

        if (!isOk) {
          element.removeClass("cur--progress");
          text.text(attrs.aguMsgDefault);
        }

        scope.$apply();
      });
    }
  };
}

export default aguDragAndDrop;