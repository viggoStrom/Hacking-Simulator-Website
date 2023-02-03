
function randomIpGen() {
    let randomIPv4 = Math.floor(Math.random() * 256).toString()

    for (let index = 0; index < 3; index++) {
        const number = Math.floor(Math.random() * 256).toString()
        randomIPv4 = randomIPv4.concat(".", number)
    }
    // adds leading zeroes to the numbers in the ip
    randomIPv4 = randomIPv4.replace(/\d+/g, (m) => {
        return "00".substring(m.length - 1) + m;
    });
    // im dont fully understand this but i know that regex is an appropriate solution to this problem

    return randomIPv4
}

const h1 = <h1>Connecting to: {randomIpGen()}</h1>

let root = ReactDOM.createRoot(document.querySelector("header span"))
root.render(h1)


// defualt text until json loads
let text = {}
text.rows = [
    "const AppDisplay = imports.ui.appDisplay;",
    "const Main = imports.ui.main;",
    "const Panel = imports.ui.panel;",
    "const PanelMenu = imports.ui.panelMenu;"
]

// source text from https://github.com/ubuntu/gnome-shell-extension-appindicator/blob/5ebb018e7b2d0219d3cf25c69f5d988b7a53121b/indicatorStatusIcon.js
// function from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
async function fetchText() {
    const requestURL = "./script/json/text.json"
    const request = new Request(requestURL)
    console.log("request sent");

    console.log("awaiting response");
    const response = await fetch(request)
    const json = await response.json()
    console.log("response recieved");
    try {
        text = json
    } catch (error) {

    }
}
fetchText()

const indent = "\u00A0 \u00A0 \u00A0 \u00A0"
const initalLi = document.querySelector("section ul li")
const heightOfLi = document.querySelector("section ul li").offsetHeight; initalLi.remove()
const numberOfLinesOnScreen = Math.round(window.innerHeight * .7 / heightOfLi)
const linesPerKeypress = 1
const textColor = "#339933"
const backgroundColor = "#111111"


let linesOfText = []
let index = 500

root = ReactDOM.createRoot(document.querySelector("section"))

document.addEventListener("keyup", (event) => {
    let codeSnippets = text.rows // make static

    if (document.querySelectorAll("section ul li").length > numberOfLinesOnScreen) {
        document.querySelectorAll("section ul li")[0].remove()
    }

    linesOfText[index] = codeSnippets[index];
    if (linesOfText[index] == "") {
        linesOfText[index] = <br></br>
    } else {
        linesOfText[index] = linesOfText[index].replaceAll("\t", indent)
    }

    var completeListToBeRendered = linesOfText.map((row) =>
        <li>{row}</li>
    );

    console.log(text.rows.length, index);
    if (index >= text.rows.length) {
        index = 0
    } else {
        index++
    }

    root.render(<ul>{completeListToBeRendered}</ul>)
});