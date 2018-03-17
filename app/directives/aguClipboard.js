"use strict";

import ClipboardJS from "clipboard";

export default function () {
  return {
    restrict: "A",
    scope: {
      aguClipboardText: "@"
    },
    link: (scope, element, attrs) => {
      new ClipboardJS(element[0]);

      element.attr("title", "Copiar para a área de transferêcia.");

      scope.$watch("aguClipboardText", value => {
        element.attr("data-clipboard-text", value);
      });

      if (attrs.aguClipboardMessage) {
        element.on("click", () => {
          alert(attrs.aguClipboardMessage);
        });
      }

      if (attrs.aguClipboardNewColor) {
        element.on("click", () => {
          element.css({
            color: attrs.aguClipboardNewColor
          });
        });
      }
    }
  };
};