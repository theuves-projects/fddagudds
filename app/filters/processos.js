"use strict";

import numbers from "./numbers.js";

export default function() {
  return docs => {
    return docs.map(doc => {
      return numbers()(doc.processo);
    }).join(
      "\n"
    );
  };
};