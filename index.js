const drop = document.querySelector("#drop");

function getData(data) {
  if (data.every(row => !row.documento || !row.processo_judicial || !row.dtremessa)) {
    alert("Planilha inválida!");
  }

  return data.map(row => {
    return {
      documento: row.documento,
      processo_judicial: row.processo_judicial,
      dtremessa: row.dtremessa
    };
  });
}

function handleFile(file) {
  const render = new FileReader();

  render.readAsBinaryString(file);

  render.onload = function (data) {
    const string = data.currentTarget.result;
    const xls = XLS.read(string, {type: "binary"});
    const name = xls.SheetNames[0];
    const sheet = xls.Sheets[name];
    const json = XLS.utils.make_json(sheet);

    console.log(getData(json));
  }
}

drop.addEventListener("dragover", event => {
  event.preventDefault();
  event.target.classList.add("actived");
});
drop.addEventListener("dragleave", event => {
  event.preventDefault();
  event.target.classList.remove("actived");
});
drop.addEventListener("drop", event => {
  event.preventDefault();

  const file = event.dataTransfer.files[0];

  if (file) {
    if (/\.xls$/.test(file.name)) {
      handleFile(file);
    } else {
      alert("Formato inválido!");
    }
  }

  event.target.classList.remove("actived");
});
