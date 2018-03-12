(function() {
  angular
    .module("app")
    .controller("Controller", Controller);

  Controller.$inject = [
    "readFile",
    "getData",
    "$scope"
  ];

  function Controller(readFile, getData, $scope) {
    const vm = this;

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
              $.vm.data = getData(json);
              vm.showDd = false;
            });
          });
        } else {
          alert("Formato inválido!");
        }
      }

      vm.class = undefined;
    };
  }
})();