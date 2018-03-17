"use strict";

export default function () {
  return string => {
    return string.replace(/\D+/g, "");
  };
};