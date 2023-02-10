class scrollingText {
    constructor() {
        this.indetSize = 8
        this.indent = "\u00A0\u00A0\u00A0\u00A0"
        this.initalLi = document.querySelector("section ul li")
        this.heightOfLi = document.querySelector("section ul li").offsetHeight; this.initalLi.remove()
        this.numberOfLinesOnScreen = Math.round(window.innerHeight * .7 / this.heightOfLi) //auto (27 lines)
        this.linesPerKeypress = 1
        this.textColor = "#008e00"
        this.backgroundColor = "#111111"
        this.startingIndex = 0
        this.smoothTyping = false

        this.root = ReactDOM.createRoot(document.querySelector("section"))
        
        this.fetchText()
    }

    // source text from https://github.com/ubuntu/gnome-shell-extension-appindicator/blob/5ebb018e7b2d0219d3cf25c69f5d988b7a53121b/indicatorStatusIcon.js
    // function from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
    async fetchText() {
        const requestURL = "./script/json/text.json"
        const request = new Request(requestURL)
        console.log("request sent");

        console.log("awaiting response");
        const response = await fetch(request)
        const json = await response.json()
        console.log("response recieved");
        try {
            this.text = json
        } catch (error) {
            console.error("failed to fetch json");
            fetchText()
        }
    }

    async fetchConfig() {
        const requestURL = "./script/json/config.json"
        const request = new Request(requestURL)
        console.log("request sent");

        console.log("awaiting response");
        const response = await fetch(request)
        const json = await response.json()
        console.log("response recieved");
        try {
            this.text = json
        } catch (error) {
            console.error("failed to fetch json");
            fetchText()
        }
    }

    updateConfig() {
        this.indent = ""
        for (let index = 0; index < this.indetSize; index++) {
            this.indent = this.indent.concat("\u00A0")
        }

        this.numberOfLinesOnScreen = Math.round(window.innerHeight * .7 / this.heightOfLi) //auto (27 lines)
        this.linesPerKeypress = 1
        this.smoothTyping = false

        document.querySelector("body").style.backgroundColor = this.backgroundColor
        document.querySelector("body").style.color = this.textColor
    }

    writeRow() {
        let codeSnippets = this.text.rows // to make sure the json files contents is used

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

        console.log(codeSnippets.length, this.index);

        this.root.render(<ul>{completeListToBeRendered}</ul>)
    }

    main = () => {
        // defualt text until json loads
        this.text = {}
        this.text.rows = [
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

        this.linesOfText = []
        this.index = this.startingIndex - 1
        this.incrementer = this.index

        document.addEventListener("keyup", (event) => {
            for (let index = 0; index < this.linesPerKeypress; index++) {
                this.writeRow()
            }
        });
    }
}

const text = new scrollingText()
text.updateConfig()
text.main()