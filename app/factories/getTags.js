"use strict";

function getTags() {
  return function (tags) {
    return Object.keys(tags).filter(key => {
      return tags[key];
    });
  }
}

export default getTags;