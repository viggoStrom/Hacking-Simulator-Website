class scrollingText {
    constructor() {
        this.initalLi = document.querySelector("section ul li")
        this.heightOfLi = document.querySelector("section ul li").offsetHeight; this.initalLi.remove()

        this.indetSize = localStorage.getItem("indentSize")
        this.indent = localStorage.getItem("indent")
        this.numberOfLinesOnScreen = localStorage.getItem("numberOfLinesOnScreen")
        this.linesPerKeypress = localStorage.getItem("linesPerKeypress")
        this.textColor = localStorage.getItem("textColor")
        this.backgroundColor = localStorage.getItem("backgroundColor")
        this.startingIndex = localStorage.getItem("startingIndex")
        this.smoothTyping = localStorage.getItem("smoothTyping")
        this.configOpen = localStorage.getItem("configOpen")

        this.root = ReactDOM.createRoot(document.querySelector("section"))

        this.fetchText()
    }

    // source text from https://github.com/ubuntu/gnome-shell-extension-appindicator/blob/5ebb018e7b2d0219d3cf25c69f5d988b7a53121b/indicatorStatusIcon.js
    // function from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
    async fetchText() {
        const requestURL = "./script/json/text.json"
        const request = new Request(requestURL)
        console.log("source text: request sent");

        console.log("source text: awaiting response");
        const response = await fetch(request)
        const json = await response.json()
        console.log("source text: response recieved");
        try {
            this.text = json
        } catch (error) {
            console.error("source text: failed to fetch (json)");
            this.fetchText()
        }
    }

    updateConfig() {
        this.indent = ""
        for (let index = 0; index < this.indetSize; index++) {
            this.indent = this.indent.concat("\u00A0")
        }

        this.numberOfLinesOnScreen = Math.round(window.innerHeight * .7 / this.heightOfLi) //auto (27 lines)

        document.querySelector("body").style.backgroundColor = this.backgroundColor
        document.querySelector("body").style.color = this.textColor
    }

    writeRow() {
        const codeSnippets = this.text.rows // to make sure the json files contents is used

        if (this.index >= this.text.rows.length - 1) {
            this.index = this.startingIndex - 1
            return
        } else {
            this.index++
            this.incrementer++
        }

        if (document.querySelectorAll("section ul li").length >= this.numberOfLinesOnScreen) {
            document.querySelectorAll("section ul li")[0].remove()
        }

        this.linesOfText[this.incrementer] = codeSnippets[this.index];

        if (this.linesOfText[this.incrementer].split('')[0] == "\t") {
            this.linesOfText[this.incrementer] = this.linesOfText[this.incrementer].replaceAll("\t", this.indent)
        }

        let completeListToBeRendered = this.linesOfText.map((row) =>
            <li>{row}</li>
        );

        this.root.render(<ul>{completeListToBeRendered}</ul>)
    }

    main = () => {
        // defualt text until json loads (shouldnt really be necessary)
        this.text = {}
        this.text.rows = [
            "function addIconToPanel(statusIcon) {",
            "\tif (!(statusIcon instanceof BaseStatusIcon))",
            "\t\tthrow TypeError(`Unexpected icon type: ${statusIcon}`);",
            "\t",
            "\tconst settings = SettingsManager.getDefaultGSettings();",
            "\tconst indicatorId = `appindicator-${statusIcon.uniqueId}`;",
            "\t",
            "\tconst currentIcon = Main.panel.statusArea[indicatorId];",
            "\tif (currentIcon) {",
            "\t\tif (currentIcon !== statusIcon)",
            "\t\t\tcurrentIcon.destroy();",
            "\t",
            "\t\tMain.panel.statusArea[indicatorId] = null;",
            "\t}",
            "\t",
            "\tMain.panel.addToStatusArea(indicatorId, statusIcon, 1,",
            "\t\tsettings.get_string('tray-pos'));",
            "\t",
            "\tUtil.connectSmart(settings, 'changed::tray-pos', statusIcon, () =>",
            "\t\taddIconToPanel(statusIcon));",
            "}",
        ]

        this.linesOfText = []
        this.index = this.startingIndex - 1
        this.incrementer = this.index

        document.addEventListener("keyup", (event) => {
            for (let index = 0; index < this.linesPerKeypress; index++) {
                this.updateConfig()
                this.writeRow()
            }
        });
    }
}

export const text = new scrollingText()
text.updateConfig()
text.main()