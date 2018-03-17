"use strict";

function aguDragAndDrop() {
  return {
    restrict: "E",
    scope: {
      aguOnDrop: "="
    },
    link: (scope, element, attrs) => {
      const text = angular
        .element(`<span class="text"></span>`)
        .text(attrs.aguMsgDefault);

      element.append(text);

      element.on("dragover", event => {
        event.preventDefault()
        element.addClass("agu-active");
        text.text(attrs.aguMsgDragover);
      });

      element.on("dragleave", event => {
        event.preventDefault()
        element.removeClass("agu-active");
        text.text(attrs.aguMsgDefault);
      });

      element.on("drop", event => {
        event.preventDefault()
        element.addClass("cur-progress");
        element.removeClass("agu-active");
        text.text(attrs.aguMsgOnDrop);

        const isOk = scope.aguOnDrop(event);

        if (!isOk) {
          element.removeClass("cur-progress");
          text.text(attrs.aguMsgDefault);
        }

        scope.$apply();
      });
    }
  };
}

export default aguDragAndDrop;