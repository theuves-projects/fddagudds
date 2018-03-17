"use strict";

import angular from "angular";

// directives
import aguClipboard from "./directives/aguClipboard";
import aguData from "./directives/aguData";
import aguDragAndDrop from "./directives/aguDragAndDrop";
import aguHtml from "./directives/aguHtml";

angular
  .module("app")
  .directive("aguClipboard", aguClipboard)
  .directive("aguData", aguData)
  .directive("aguDragAndDrop", aguDragAndDrop)
  .directive("aguHtml", aguHtml);
