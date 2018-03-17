"use strict";

import template from "./templates/aguData.html";

export default function () {
  return {
    restrict: "E",
    scope: {
      data: "=aguData"
    },
    bindToController: true,
    template: template,
    controller: function () {
      const vm = this;
      ///////////////

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
    },
    controllerAs: "vm"
  };
}