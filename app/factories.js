"use strict";

import angular from "angular";

// factories
import filterTags from "./factories/filterTags.js";
import getData from "./factories/getData.js";
import getTags from "./factories/getTags.js";
import isNumber from "./factories/isNumber.js";
import onlyNumbers from "./factories/onlyNumbers.js";
import readFile from "./factories/readFile.js";

angular
  .module("app")
  .factory("filterTags", filterTags)
  .factory("getData", getData)
  .factory("getTags", getTags)
  .factory("isNumber", isNumber)
  .factory("onlyNumbers", onlyNumbers)
  .factory("readFile", readFile);
