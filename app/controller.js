(function() {
  angular
    .module("app")
    .controller("Controller", Controller);

  Controller.$inject = [
    "readFile",
    "getData"
  ];

  function Controller(readFile, getData) {
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
          readFile(file, function (json) {
            console.log(getData(json));
          });
        } else {
          alert("Formato inválido!");
        }
      }

      vm.showDd = false;
    };
  }
})();