(function () {
  angular
    .module("app")
    .filter("pesquisar", pesquisar)
    .filter("numbers", numbers)
    .filter("processos", processos);

  function pesquisar() {
    return (data, start, end) => {
      if (typeof start === "number" && typeof end === "number" && start <= end) {
        return data.filter(doc => {
          const processo_judicial = doc.processo_judicial;
          const number = processo_judicial.replace(/^.*>(\d+)<.*$/, "$1");

          return start <= number && end >= number;
        });
      } else {
        return data;
      }
    };
  }

  function numbers() {
    return string => {
      return string.replace(/\D+/g, "");
    };
  }

  function processos() {
    return docs => {
      return docs.map(doc => {
        return numbers()(doc.processo_judicial);
      }).join(
        "\n"
      );
    };
  }
})();