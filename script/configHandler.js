const configMenu = document.getElementById("configMenu")

function openConfigMenu() {
    if (configMenu.style.display == "none") {
        configMenu.style.display = "grid"
    } else {
        configMenu.style.display = "none"
    }
}