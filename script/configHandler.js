const configMenu = document.getElementById("configMenu")

function openConfigMenu() {

    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
        localStorage.setItem("configOpen", true)
        updateLocalStorage()
    } else {
        configMenu.style.display = "none"
        localStorage.setItem("configOpen", false)
        updateLocalStorage()
    }
}

const config = {
    "numberOfLinesOnScreen": 27,
    "indentSize": 8,
    "linesPerKeypress": 1,
    "textColor": "#008e00",
    "backgroundColor": "#111111",
    "startingIndex": 0,
    "smoothTyping": false,
    "indent": "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
    "configOpen": false
}


if (localStorage.length != config.length) {
    for (const key in config) {
        if (Object.hasOwnProperty.call(config, key)) {
            localStorage.setItem(key, config[key])
        }
    }
}

function clearAllText() {
    document.querySelectorAll("section ul li").forEach(element => {
        element.remove()
    });
}

const inputFields = document.querySelectorAll("#configMenu ul li input")

function updateLocalStorage() {
    for (let index = 0; index < inputFields.length; index++) {
        const element = inputFields[index];
        localStorage.setItem(config[index], element.value)
    }
}

console.log(localStorage);

openConfigMenu()