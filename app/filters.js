(function () {
  angular
    .module("app")
    .filter("pesquisar", pesquisar)
    .filter("numbers", numbers)
    .filter("processos", processos)
    .filter("isEmpty", isEmpty);

  function pesquisar() {
    function getTags(tags) {
      return Object.keys(tags).filter(key => {
        return tags[key];
      });
    }

    return (data, start, end, tags) => {
      data = data.filter(doc => {
        const documento = Object.keys(tags).includes(doc.documento)
          ? doc.documento
          : "OUTROS";

        return getTags(tags).includes(documento);
      });

      if (typeof start === "number" && typeof end === "number" && start <= end) {
        return data.filter(doc => {
          const processo = doc.processo;
          const number = processo.replace(/^.*>(\d+)<.*$/, "$1");

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
        return numbers()(doc.processo);
      }).join(
        "\n"
      );
    };
  }

  function isEmpty() {
    return item => {
      return item.length === 0;
    };
  }
})();