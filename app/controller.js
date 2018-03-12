(function() {
  angular
    .module("app")
    .controller("Controller", Controller);

  Controller.$inject = [
    "readFile",
    "getData",
    "$scope",
    "$window"
  ];

  function Controller(readFile, getData, $scope, $window) {
    const vm = this;
    ////////////////

    vm.tags = {
      "ATO ORDINATÓRIO": true,
      "SENTENÇA": true,
      "DECISÃO": true,
      "DESPACHO": true,
      "DECISÃO JEF": true,
      "DESPACHO JEF": true,
      "CITAÇÃO": true,
      "CITAÇÃO COM AUDIÊNCIA": true,
      "OUTROS": true
    };

    vm.class = "";

    vm.showDd = true;

    vm.dragover = () => {
      vm.class = "actived";
    };
    vm.dragleave = () => {
      vm.class = undefined;
    };
    vm.drop = event => {
      const file = event.dataTransfer.files[0];

      if (file) {
        if (/\.xls$/.test(file.name)) {
          readFile(file, json => {
            $scope.$apply($ => {
              $.vm.data = getData(json) || [];
              vm.showDd = false;
            });
          });
        } else {
          $window.alert("Formato inválido!");
        }
      }

      vm.class = undefined;
    };
  }
})();