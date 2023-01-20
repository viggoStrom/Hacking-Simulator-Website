
const randomIpGen = () => {
    let randomIPv4 = Math.floor(Math.random() * 256).toString()

    for (let index = 0; index < 3; index++) {
        const number = Math.floor(Math.random() * 256).toString()
        randomIPv4 = randomIPv4.concat(".",number)
    }
    // im dont fully understand this but i know that RE is an appropriate solution to this problem
    randomIPv4 = randomIPv4.replace(/\d+/g, function (m) {
        return "00".substring(m.length - 1) + m;
    });

    return randomIPv4
}


const h1 = <h1>Connecting to: {randomIpGen()}</h1>

const root = ReactDOM.createRoot(document.querySelector("header span"))
root.render(h1)