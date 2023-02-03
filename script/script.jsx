class scrollingText {
    constructor() {

    }

    main = () => {



        // defualt text until json loads
        let text = {}
        text.rows = [
            "function addIconToPanel(statusIcon) {",
            "\tif (!(statusIcon instanceof BaseStatusIcon))",
            "\t\tthrow TypeError(`Unexpected icon type: ${statusIcon}`);",
            "",
            "\tconst settings = SettingsManager.getDefaultGSettings();",
            "\tconst indicatorId = `appindicator-${statusIcon.uniqueId}`;",
            "",
            "\tconst currentIcon = Main.panel.statusArea[indicatorId];",
            "\tif (currentIcon) {",
            "\t\tif (currentIcon !== statusIcon)",
            "\t\t\tcurrentIcon.destroy();",
            "",
            "\t\tMain.panel.statusArea[indicatorId] = null;",
            "\t}",
            "",
            "\tMain.panel.addToStatusArea(indicatorId, statusIcon, 1,",
            "\t\tsettings.get_string('tray-pos'));",
            "",
            "\tUtil.connectSmart(settings, 'changed::tray-pos', statusIcon, () =>",
            "\t\taddIconToPanel(statusIcon));",
            "}",
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

        const indent = "\u00A0 \u00A0 \u00A0 "
        const initalLi = document.querySelector("section ul li")
        const heightOfLi = document.querySelector("section ul li").offsetHeight; initalLi.remove()
        // const numberOfLinesOnScreen = Math.round(window.innerHeight * .7 / heightOfLi)
        const numberOfLinesOnScreen = 29
        const linesPerKeypress = 1
        const textColor = "#008e00"
        const backgroundColor = "#111111"

        let linesOfText = []
        let index = 0

        const root = ReactDOM.createRoot(document.querySelector("section"))

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
    }
}

const text = new scrollingText()
text.main()