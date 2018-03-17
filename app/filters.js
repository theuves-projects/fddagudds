"use strict";

import angular from "angular";

// filters
import isEmpty from "./filters/isEmpty.js";
import numbers from "./filters/numbers.js";
import processos from "./filters/processos.js";
import search from "./filters/search.js";

angular
  .module("app")
  .filter("isEmpty", isEmpty)
  .filter("numbers", numbers)
  .filter("processos", processos)
  .filter("search", search);
