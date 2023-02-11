const configMenu = document.getElementById("configMenu")

function openConfigMenu() {
    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
        text.configOpen = true
    } else {
        configMenu.style.display = "none"
        text.configOpen = false
    }
}

fetch("./script/json/config.json")
  .then(response => response.json())
  .then(data => {
    // do something with the data
    console.log(data);
  })
  .catch(error => console.error(error));
