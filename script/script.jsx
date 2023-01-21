
const randomIpGen = () => {
    let randomIPv4 = Math.floor(Math.random() * 256).toString()

    for (let index = 0; index < 3; index++) {
        const number = Math.floor(Math.random() * 256).toString()
        randomIPv4 = randomIPv4.concat(".", number)
    }
    // im dont fully understand this but i know that RE is an appropriate solution to this problem
    randomIPv4 = randomIPv4.replace(/\d+/g, (m) => {
        return "00".substring(m.length - 1) + m;
    });

    return randomIPv4
}

const h1 = <h1>Connecting to: {randomIpGen()}</h1>

let root = ReactDOM.createRoot(document.querySelector("header span"))
root.render(h1)


// const indent = "\u00A0\u00A0\u00A0\u00A0"

// solution found at https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

let code = [
    "A row of code to be rendered",
    "more strinfs",
    "completeListToBeRendered",
    "thingsToRender.push(code)",
    "renderQueue"
]

let linesOfText = []

root = ReactDOM.createRoot(document.querySelector("section ul"))

document.addEventListener("keyup", (event) => {
    linesOfText.push(code.random());

    const completeListToBeRendered = linesOfText.map((row) =>
        <li>{row}</li>
    );

    root.render(<ul>{completeListToBeRendered}</ul>)
});