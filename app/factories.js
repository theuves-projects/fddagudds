(function() {
  angular
    .module("app")
    .factory("readFile", readFile)
    .factory("getData", getData);

  function readFile() {
    return function (file, cb) {
      const render = new FileReader();

      render.readAsBinaryString(file);

      render.onload = (data) => {
        const string = data.currentTarget.result;
        const xls = XLS.read(string, {type: "binary"});
        const name = xls.SheetNames[0];
        const sheet = xls.Sheets[name];
        const json = XLS.utils.make_json(sheet);

        cb(json);
      };
    };
  }

  function getData() {
    return function (data) {
      if (data.every(row => !row.documento || !row.processo_judicial || !row.dtremessa)) {
        alert("Planilha inválida!");
      }

      function format(number) {
        const re = /(\d{7})(\d{2})(\d{4})(\d{3})(\d{4})/;
        const mask = "$1-$2.$3.$4.$5";

        return number.replace(re, mask);
      }

      function highlight(number) {
        const re = /^(\d{5})(\d{2})/;
        const mask = `$1<span class="hi">$2</span>`;

        return number.replace(re, mask);
      };

      function getDate(date) {
        return date.replace(/(\d+)\/(\d+)\/(\d+).*/, function (_, dd, mm, yy) {
          dd = dd.padStart(2, "0");
          mm = mm.padStart(2, "0");
          yy = yy.padStart(2, "0");

          return `${dd}/${mm}/${yy}`;
        });
      }

      return data.map(row => {
        return {
          documento: row.documento,
          processo_judicial: highlight(format(row.processo_judicial)),
          dtremessa: getDate(row.dtremessa)
        };
      });
    };
  }
})();