const configMenu = document.getElementById("configMenu")
const li = configMenu.querySelectorAll("ul li")

function refreshConfigLi() {
    li.forEach(element => {
        input = element.querySelector("input")
        input.value = localStorage.getItem(input.id)
    });
    document.querySelector("body").style.backgroundColor = localStorage.getItem("backgroundColor")
    document.querySelector("body").style.color = localStorage.getItem("textColor")
}
refreshConfigLi()

function openConfigMenu() {
    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
        localStorage.setItem("configOpen", true)
    } else {
        configMenu.style.display = "none"
        localStorage.setItem("configOpen", false)
    }
}

const defaultConfig = {
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

function setToDefault() {
    localStorage.clear()
    for (const key in defaultConfig) {
        localStorage.setItem(key, defaultConfig[key])
    }
    refreshConfigLi()
}


function clearAllText() {
    document.querySelectorAll("section ul li").forEach(element => {
        element.remove()
    });
}

const inputFields = document.querySelectorAll("#configMenu ul li input")

function updateLocalStorage(element) {
    localStorage.setItem(element.id, element.value)
    document.querySelector("body").style.backgroundColor = localStorage.getItem("backgroundColor")
    document.querySelector("body").style.color = localStorage.getItem("textColor")
}

if (localStorage.length <= 5) {
    setToDefault()
}