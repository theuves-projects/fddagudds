"use strict";

filterTags.$inject = [
  "getTags"
];

function filterTags(
  getTags
) {
  return function (data, tags) {
    if (!data) return [];
    return data.filter(doc => {
      const documento = Object.keys(tags).includes(doc.documento)
        ? doc.documento
        : "OUTROS";

      return getTags(tags).includes(documento);
    });
  }
}

export default filterTags;