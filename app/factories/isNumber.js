"use strict";

function isNumber() {
  return function (value) {
    return typeof value === "number";
  }
}

export default isNumber;