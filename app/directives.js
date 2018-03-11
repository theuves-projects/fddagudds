(function() {
  angular
    .module("app")
    .directive("aguHtml", aguHtml)
    .directive("aguDragAndDrop", aguDragAndDrop)
    .directive("aguClipboard", aguClipboard);

  function aguHtml() {
    return {
      restrict: "E",
      link: (scope, element, attrs) => {
        element.html(attrs.value);
      }
    }
  }

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

  function aguClipboard() {
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
  }
})();