
const randomIpGen = () => {
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



// solution found at https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

// source text from https://github.com/ubuntu/gnome-shell-extension-appindicator/blob/5ebb018e7b2d0219d3cf25c69f5d988b7a53121b/indicatorStatusIcon.js
async function fetchText() {
    const requestURL = "https://github.com/viggoStrom/hackingSim/blob/master/script/json/text.json"
    const request = new Request(requestURL)

    const response = await fetch(request)
    const value = await response.json()

    return value
}

const text = fetchText()

// const codeSnippets = [
//     "const AppDisplay = imports.ui.appDisplay;",
//     "const Main = imports.ui.main;",
//     "const Panel = imports.ui.panel;",
//     "const PanelMenu = imports.ui.panelMenu;"
// ]

const codeSnippets = text.rows

const indent = "\u00A0\u00A0\u00A0\u00A0"
const linesToBeDrawBeforeScrolling = Math.floor(window.innerHeight * .8 / 21)

let linesOfText = []

root = ReactDOM.createRoot(document.querySelector("section"))

document.addEventListener("keyup", (event) => {

    if (document.querySelectorAll("section ul li").length > linesToBeDrawBeforeScrolling) {
        document.querySelectorAll("section ul li")[0].remove()
    }

    linesOfText.push(codeSnippets.random());

    var completeListToBeRendered = linesOfText.map((row) =>
        <li>{row}</li>
    );

    root.render(<ul>{completeListToBeRendered}</ul>)
});