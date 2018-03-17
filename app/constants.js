"use strict";

import angular from "angular";
import ClipboardJS from "clipboard";
import XLS from "xlsx";

angular
  .module("app")
  .constant("ClipboardJS", ClipboardJS)
  .constant("XLS", XLS);