const configMenu = document.getElementById("configMenu")

function openConfigMenu() {
    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
        // text.configOpen = true
    } else {
        configMenu.style.display = "none"
        // text.configOpen = false
    }
}

// fetch("./script/json/config.json")
//     .then(response => response.json())
//     .then(data => {
//         // do something with the data
//         data.textColor = "#ffffff"
//         console.log(data);
//     })
//     .catch(error => console.error(error));

localStorage.setItem("indentSize", 8)
localStorage.setItem("indent", "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0")
localStorage.setItem("numberOfLinesOnScreen", 27)
localStorage.setItem("linesPerKeypress", 1)
localStorage.setItem("textColor", "#008e00")
localStorage.setItem("backgroundColor", "#111111")
localStorage.setItem("startingIndex", 0)
localStorage.setItem("smoothTyping", false)

console.log(localStorage);
localStorage.removeItem("config")