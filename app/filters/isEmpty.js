"use strict";

function isEmpty() {
  return item => {
    return item.length === 0;
  };
};

export default isEmpty;