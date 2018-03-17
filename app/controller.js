"use strict";

import angular from "angular";

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

  vm.onDrop = event => {
    const file = event.dataTransfer.files[0];

    if (!file) return undefined;
    if (!/\.xls$/.test(file.name))
      return $window.alert("Formato inválido!");

    readFile(file, json => {
      $scope.$apply($ => {
        $.vm.data = getData(json) || [];
        vm.isHome = !vm.isHome;
      });
    });
  };
}