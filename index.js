var requestURL = 'https://api.jsonbin.io/b/60b533402d9ed65a6a7ac99a'; // получение json
// var requestURL2 = 'https://api.jsonbin.io/b/60b7350db104de5acddd6c50/2'; // получение альтернативного json для проверки

async function sendRequest(url) {
  try {
    // let response = await fetch(url); // *****для проверки работы с внешним json необходимо раскомментировать
    // let data = await response.json();
    var data = { // вместо json, чтобы легче было проверять скрипт ***** нужно закомментировать, если обращаемся к внешнему json
      distance: {
        unit: "yd",
        value: 12
      },
      convert_to: "m"
    };
    return data; // преобразование результата функции конвертации в json
  } catch (e) {
    console.log("Something wrong in ", e);
  }
}

function calculate(jsonObject) {
  
  var meterRatio = { // Объект с соотношением искомых величин к метру
    m: 1,
    cm: 100,
    in: 39.3701,
    ft: 3.28084,
    mm: 1000,
    yd: 1.09361,
    km: 0.001
  }; 
  if (jsonObject.convert_to in meterRatio) {
    const finalResult = meterRatio.m / meterRatio[jsonObject.distance.unit] * meterRatio[jsonObject.convert_to] * jsonObject.distance.value;
    let jsonForSendindg = {
      unit: jsonObject.convert_to,
      value: finalResult.toFixed(2) // округляем до сотых и записываем в объект
    };
    console.log("Result without rounding ", finalResult); // для проверки оставил вывод в консоль
    return jsonForSendindg;
  } else {
    throw new Error("Invalid metrics");
    // тут мы можем добавить код, который добавит отношение величины к метру, если её нет в meterRatio
  }
}

async function convert() {
  try {
    const jsonObject = await sendRequest(requestURL);
    const convertedData = jsonObject;
    const result = calculate(convertedData);
    let resultJson = JSON.stringify(result);
    console.log(`I had this distance: ${jsonObject.distance.value} ${jsonObject.distance.unit}. I converted it into ${jsonObject.convert_to}`);
    console.log("*CHECK* This is:",typeof resultJson, resultJson); // окончательная проверка 
  } catch (e) {
    console.log("Something wrong in ", e);
  }
}

convert();
