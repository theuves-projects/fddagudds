"use strict";

import angular from "angular";

// filters
import isEmpty from "./filters/isEmpty.js";
import onlyNumbers from "./filters/onlyNumbers.js";
import getBlock from "./filters/getBlock.js";
import search from "./filters/search.js";

angular
  .module("app")
  .filter("getBlock", getBlock)
  .filter("isEmpty", isEmpty)
  .filter("onlyNumbers", onlyNumbers)
  .filter("search", search);
