class scrollingText {
    constructor() {
        this.indent = "\u00A0 \u00A0 \u00A0 "
        this.initalLi = document.querySelector("section ul li")
        this.heightOfLi = document.querySelector("section ul li").offsetHeight; this.initalLi.remove()
        this.numberOfLinesOnScreen = Math.round(window.innerHeight * .7 / this.heightOfLi) //auto (27 lines)
        this.linesPerKeypress = 1
        this.textColor = "#008e00"
        this.backgroundColor = "#111111"
        this.startingIndex = 0
        this.smoothTyping = false

        document.querySelector("body").style.backgroundColor = this.backgroundColor
        document.querySelector("body").style.color = this.textColor
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
                fetchText()
            }
        }
        fetchText()


        let linesOfText = []
        let index = this.startingIndex - 1
        let incrementer = index

        const root = ReactDOM.createRoot(document.querySelector("section"))

        document.addEventListener("keyup", (event) => {
            let codeSnippets = text.rows // to make sure the json files contents is used

            if (index >= text.rows.length - 1) {
                index = this.startingIndex - 1
                return
            } else {
                index++
                incrementer++
            }

            if (document.querySelectorAll("section ul li").length >= this.numberOfLinesOnScreen) {
                document.querySelectorAll("section ul li")[0].remove()
            }

            linesOfText[incrementer] = codeSnippets[index];

            if (linesOfText[incrementer] == "") {
                linesOfText[incrementer] = " "
            }
            if (linesOfText[incrementer].split('')[0] == "\t") {
                linesOfText[incrementer] = linesOfText[incrementer].replaceAll("\t", this.indent)
            }

            let completeListToBeRendered = linesOfText.map((row) =>
                <li>{row}</li>
            );

            console.log(text.rows.length, index);

            root.render(<ul>{completeListToBeRendered}</ul>)
        });
    }
}

const text = new scrollingText()
text.main()