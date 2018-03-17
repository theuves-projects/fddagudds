"use strict";

getData.$inject = [
  "$window"
];

function getData($window) {
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

    function invertDate(date) {
      return date.replace(/^(\d+)-(\d+)-(\d+)$/, "$2-$1-$3");
    }

    function addSeconds(date, seconds) {
      const dt = new Date((new Date(invertDate(date))).getTime() + seconds);
      const dd = dt.getDate().toString().padStart(2, "0");
      const mm = (dt.getMonth() + 1).toString().padStart(2, "0");
      const yy = dt.getFullYear().toString().padStart(2, "0");

      return `${dd}-${mm}-${yy}`;
    }

    function prazo(tag) {
      if (/^\s*cita/i.test(tag)) return 30;
      return 10;
    }

    function getDataFinal(date, days) {
      return addSeconds(date, days * 86400000);
    }

    const reDoc = /\b(documento|etiqueta)\b/i;
    const reProcesso = /\bprocesso/i;
    const reData = /(data.*remessa|dtremessa)/i;
    const nameDoc = Object.keys(data[0]).find(key => reDoc.test(key));
    const nameProcesso = Object.keys(data[0]).find(key => reProcesso.test(key));
    const nameData = Object.keys(data[0]).find(key => reData.test(key));

    return data.map(row => {
      if (!row[nameDoc] || !row[nameProcesso] || !row[nameData]) {
        $window.alert("Planilha inválida!");

        throw new Error("Planilha inválida!");
      }

      return {
        pronto: false,
        documento: row[nameDoc],
        processo: highlight(format(row[nameProcesso])),
        prazo: `${prazo(row[nameDoc])} dias`,
        dataInicial: getDate(row[nameData]),
        dataFinal: getDataFinal(getDate(row[nameData]), prazo(row[nameDoc]))
      };
    });
  };
};

export default getData;