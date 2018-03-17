import "../index.css";
import angular from "angular";

const app = angular.module("app", []);

require("./constants.js");
require("./directives.js");
require("./factories.js");
require("./filters.js");

angular
  .module("app")
  .controller("Controller", Controller);

Controller.$inject = [
  "$scope",
  "$window",
  "readFile",
  "getData"
];

function Controller(
  $scope,
  $window,
  readFile,
  getData
) {
  const vm = this;
  ////////////////

  vm.isHome = true;

  /**
   * INFO:
   * deve retornar:
   *  - `true` quando dar certo
   *  - `false` quando dar errado
   */
  vm.onDrop = event => {
    const file = event.dataTransfer.files[0];

    if (!file) return false;

    if (!/\.xls$/.test(file.name)) {
      $window.alert("Formato inválido!");
      return false;
    }

    readFile(file, json => {
      $scope.$apply($ => {
        $.vm.data = getData(json) || [];
        vm.isHome = !vm.isHome;
      });
    });

    return true;
  };
}