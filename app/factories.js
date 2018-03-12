(function() {
  angular
    .module("app")
    .factory("readFile", readFile)
    .factory("getData", getData);

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
  }

  function getData() {
    return function (data) {
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
        return date.replace(/(\d+)\/(\d+)\/(\d+).*/, function (_, mm, dd, yy) {
          dd = dd.padStart(2, "0");
          mm = mm.padStart(2, "0");
          yy = yy.padStart(2, "0");

          return `${dd}-${mm}-20${yy}`;
        });
      }

      const reDoc = /\b(documento|etiqueta)\b/i;
      const reProcesso = /\bprocesso/i;
      const reData = /(data.*remessa|dtremessa)/i;
      const nameDoc = Object.keys(data[0]).find(key => reDoc.test(key));
      const nameProcesso = Object.keys(data[0]).find(key => reProcesso.test(key));
      const nameData = Object.keys(data[0]).find(key => reData.test(key));

      return data.map(row => {
        if (!row[nameDoc] || !row[nameProcesso] || !row[nameData]) {
          alert("Planilha inválida!");

          throw new Error("Planilha inválida!");
        }

        return {
          pronto: false,
          documento: row[nameDoc],
          processo: highlight(format(row[nameProcesso])),
          data: getDate(row[nameData])
        };
      });
    };
  }
})();