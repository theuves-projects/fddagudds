"use strict";

getBlock.$inject = [
  "onlyNumbers"
];

function getBlock(
  onlyNumbers
) {
  return docs => {
    return docs.map(doc => {
      return onlyNumbers(doc.processo);
    }).join(
      "\n"
    );
  };
}

export default getBlock;