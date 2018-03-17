"use strict";

import angular from "angular";

// factories
import filterTags from "./factories/filterTags.js";
import readFile from "./factories/readFile.js";
import getTags from "./factories/getTags.js";
import getData from "./factories/getData.js";
import isNumber from "./factories/isNumber.js";

angular
  .module("app")
  .factory("filterTags", filterTags)
  .factory("readFile", readFile)
  .factory("getTags", getTags)
  .factory("getData", getData)
  .factory("isNumber", isNumber);
