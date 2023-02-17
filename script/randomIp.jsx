
function randomIpGen() {
    let randomIPv4 = Math.floor(Math.random() * 256).toString()

    for (let index = 0; index < 3; index++) {
        const number = Math.floor(Math.random() * 256).toString()
        randomIPv4 = randomIPv4.concat(".", number)
    }
    // adds leading zeroes to the numbers in the ip
    // randomIPv4 = randomIPv4.replace(/\d+/g, (m) => {
    //     return "00".substring(m.length - 1) + m;
    // });
    // im dont fully understand this but i know that regex is an appropriate solution to this problem

    return randomIPv4
}

const h1 = <h1>Connecting to: {randomIpGen()}</h1>

let root = ReactDOM.createRoot(document.querySelector("header div"))
root.render(h1)