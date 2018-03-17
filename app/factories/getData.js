"use strict";

getData.$inject = [
  "$window"
];

function getData($window) {
  return function (data) {

    /**
     * formatar o número de um processo
     */
    function format(number) {
      const re = /(\d{7})(\d{2})(\d{4})(\d{3})(\d{4})/;
      const mask = "$1-$2.$3.$4.$5";

      return number.replace(re, mask);
    }

    /**
     * destacar os números que serão importantes
     */
    function highlight(number) {
      const re = /^(\d{5})(\d{2})/;
      const mask = `$1<span class="hi">$2</span>`;

      return number.replace(re, mask);
    };

    /**
     * extrair somente a data duma string
     */
    function getDate(date) {
      return date.replace(/(\d+)\/(\d+)\/(\d+).*/, function (_, mm, dd, yy) {
        dd = dd.padStart(2, "0");
        mm = mm.padStart(2, "0");
        yy = yy.padStart(2, "0");

        return `${dd}-${mm}-20${yy}`;
      });
    }

    /**
     * aumentar uma data a partir de segundos
     */
    function addSeconds(date, seconds) {

      /**
       * isso:
       *  - coverte para o formato "mm/dd/aaaa"
       *  - usa "/", pois o Mozilla Firefox não entende "-"
       */
      const normalizeDate = date => date.replace(/^(\d+)-(\d+)-(\d+)$/, "$2/$1/$3");

      const dt = new Date((new Date(normalizeDate(date))).getTime() + seconds);
      const dd = dt.getDate().toString().padStart(2, "0");
      const mm = (dt.getMonth() + 1).toString().padStart(2, "0");
      const yy = dt.getFullYear().toString().padStart(2, "0");

      return `${dd}-${mm}-${yy}`;
    }

    /**
     * aumentar a data a partir de dias
     */
    function addDays(date, days) {
      return addSeconds(date, days * 86400000);
    }

    /**
     * obter o prazo (em dias) de cada documento
     *
     * regras:
     *   - para todas as "citações" são 30 dias
     *   - para o restante são 10 dias
     */
    function getDeadline(tag) {
      if (/^\s*cita/i.test(tag)) return 30;
      return 10;
    }

    const reDoc = /\b(documento|etiqueta)\b/i;
    const reProcesso = /\bprocesso/i;
    const reData = /(data.*remessa|dtremessa)/i;
    const nameDoc = Object.keys(data[0]).find(key => reDoc.test(key));
    const nameProcesso = Object.keys(data[0]).find(key => reProcesso.test(key));
    const nameData = Object.keys(data[0]).find(key => reData.test(key));

    return data.map(row => {
      if (!row[nameDoc] || !row[nameProcesso] || !row[nameData]) {
        const message = "Planilha inválida!";

        $window.alert(message);
        throw new Error(message);
      }

      const deadline = getDeadline(row[nameDoc]);
      const date = getDate(row[nameData]);

      return {
        pronto: false,
        documento: row[nameDoc],
        processo: highlight(format(row[nameProcesso])),
        prazo: `${deadline} dias`,
        dataInicial: date,
        dataFinal: addDays(date, deadline)
      };
    });
  };
};

export default getData;