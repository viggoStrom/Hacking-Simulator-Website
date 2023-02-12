const configMenu = document.getElementById("configMenu")

function openConfigMenu() {

    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
        localStorage.setItem("configOpen", true)
    } else {
        configMenu.style.display = "none"
        localStorage.setItem("configOpen", false)
    }
}

const config = {
    "indentSize": 8,
    "indent": "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
    "numberOfLinesOnScreen": 27,
    "linesPerKeypress": 1,
    "textColor": "#008e00",
    "backgroundColor": "#111111",
    "startingIndex": 0,
    "smoothTyping": false,
    "configOpen": false,
}

for (const key in config) {
    if (Object.hasOwnProperty.call(config, key)) {
        localStorage.setItem(key, config[key])
    }
}

console.log(localStorage);

openConfigMenu()