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

console.log(localStorage);

openConfigMenu()