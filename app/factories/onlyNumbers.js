"use strict";

function onlyNumbers() {
  return function (string) {
    return string.replace(/\D+/g, "");
  };
}

export default onlyNumbers;