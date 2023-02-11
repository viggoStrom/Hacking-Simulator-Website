const configMenu = document.getElementById("configMenu")
const configMenuWrapper = document.getElementById("configMenuAlignmentWrapper")

configMenuWrapper.addEventListener("click", function(event) {
    event.stopPropagation();
  });  

function openConfigMenu() {
    console.log('Clicked:', window.event.target);
    window.event.stopPropagation()

    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
        configMenuWrapper.setAttribute("onClick","openConfigMenu()")
        // text.configOpen = true
    } else {
        configMenu.style.display = "none"
        configMenuWrapper.setAttribute("onClick","")
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

if (localStorage.length < 8) {
    localStorage.setItem("indentSize", 8)
    localStorage.setItem("indent", "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0")
    localStorage.setItem("numberOfLinesOnScreen", "auto") // Math.round(window.innerHeight * .7 / this.heightOfLi) //auto (27 lines)
    localStorage.setItem("linesPerKeypress", 1)
    localStorage.setItem("textColor", "#008e00")
    localStorage.setItem("backgroundColor", "#111111")
    localStorage.setItem("startingIndex", 0)
    localStorage.setItem("smoothTyping", false)
}

console.log(localStorage);