"use strict";

import XLS from "xlsx";

function readFile() {
  return function (file, cb) {
    const render = new FileReader();

    render.readAsBinaryString(file);

    render.onload = data => {
      const string = data.currentTarget.result;
      const xls = XLS.read(string, {type: "binary"});
      const name = xls.SheetNames[0];
      const sheet = xls.Sheets[name];
      const json = XLS.utils.make_json(sheet);

      cb(json);
    };
  };
};

export default readFile;