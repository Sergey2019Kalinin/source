const parametrsObject = {
  value: "Наименование компании",
  "data.inn": "ИНН",
  "data.kpp": "КПП",
  "data.ogrn": "ОГРН",
  "data.okato": "Код ОКАТО",
  "data.oktmo": "Код ОКТМО",
  "data.okpo": "Код ОКПО",
  "data.okogu": "Код ОКОГУ",
  "data.okfs": "Код ОКФС",
  "data.okved": "Код ОКВЭД"
};

// переменная для замыкания - ответ с сервера
let summData;

// массив массивов для построения таблицы
let dataArray = [];

//  получение data для таблицы
function arrayMaker() {
  Object.keys(parametrsObject).forEach(function (key) {
    let item = [];
    let summDataResult;

    if (key === "value") {
      summDataResult = summData.suggestions[0][key];
    } else {
      summDataResult =
        summData.suggestions[0][key.split(".")[0]][key.split(".")[1]];
    }

    item.push(parametrsObject[key]);

    item.push(summDataResult);

    dataArray.push(item);
  });
}

function dataMaker() {

let data = dataArray;

let container = document.getElementById('example');
let hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true,
  licenseKey: 'non-commercial-and-evaluation'
});
};

const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
const token = "7b607e66ab1a84847e1faad5cb4547f49adcc182";

let query = "5905004579";

let options = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Token " + token
  },
  body: JSON.stringify({ query: query })
};

fetch(url, options)
  .then((response) => response.json())
  .then((result) => (summData = result))
  .catch((error) => console.log("error", error));

setTimeout(arrayMaker, 1000);
setTimeout(dataMaker, 1500);



