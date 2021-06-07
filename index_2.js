const requestURL = 'https://api.jsonbin.io/b/60ba3b9b92164b68bebff294';
async function sendRequest(url) {
    try {
        let response = await fetch(url); // *****для проверки работы с внешним json необходимо раскомментировать
        let someData = await response.json();
        // var someData = { 
        //     data: [{
        //             user: "mike@mail.com",
        //             rating: 20,
        //             disabled: false
        //         },
        //         {
        //             user: "greg@mail.com",
        //             rating: 14,
        //             disabled: false
        //         },
        //         {
        //             user: "john@mail.com",
        //             rating: 25,
        //             disabled: true
        //         }
        //     ],
        //     condition: {
        //         include: [{
        //             disabled: false

        //         }],
        //         sort_by: ["rating"]
        //     }
        // };// вместо json, чтобы легче было проверять скрипт ***** нужно закомментировать, если обращаемся к внешнему json

        return someData; // преобразование результата функции конвертации в json
    } catch (e) {
        console.log("Something wrong in ", e);
    }
}

function sortFromSmallToBig(arr, key) {
    return arr.sort((a, b) => a.key > b.key ? 1 : -1);
}

function sortTask(data, condition) {
    let localData = data;
    function sortFromSmallToBig(arr, $key) {
        return arr.sort((a, b) => a.key > b.key ? 1 : -1);
    }

    if (condition.include) {
        if (condition.include[0].disabled == true) {
            localData = localData.filter(function (item) {
                if (item.disabled == true) {
                    return item;
                }
            })
        }
        if (condition.include[0].disabled == false) {
            localData = localData.filter(function (item) {
                if (item.disabled != true) {
                    return item;
                }
            })
        }
        return sortFromSmallToBig(localData, "rating");
        console.log(condition);
    }
    if (condition.exclude) {
        console.log(condition.exclude[0].disabled);
        if (condition.exclude[0].disabled == true) {
            localData = localData.filter(function (item) {
                if (item.disabled != true) {
                    return item;
                }
            })
        }
        if (condition.exclude[0].disabled == false) {
            localData = localData.filter(function (item) {
                if (item.disabled == true) {
                    return item;
                }
            })
        }
        return sortFromSmallToBig(localData, "rating");
    }
}

async function task() {
    try {
        const jsonObject = await sendRequest(requestURL);
        const convertedData = jsonObject;
        const littleResult = sortTask(convertedData.data, convertedData.condition);
        console.log(littleResult);
        const result = {
            "result": littleResult
        };
        console.log(JSON.stringify(result));
    } catch (e) {
        console.log("Something wrong in ", e);
    }
}

task();