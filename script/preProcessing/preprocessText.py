
try:
    source = open(
        "G:/My Drive/misc/GitHub/hackingSim/script/sourceText.txt", "r")
    destination = open(
        "G:/My Drive/misc/GitHub/hackingSim/script/json/text.json", "w")
finally:
    print("Failure to open source or destination")

leadingBoilerPlate = "{\n\t\"rows\": [\n"

trailingBoilerPlate = "\t\t\"\"\n\t]\n}"

destination.write(leadingBoilerPlate)
for line in source:
    # add leading quote
    formattedLine = "\"" + line
    # removes new line
    formattedLine = formattedLine.replace("\n", "")
    # add trailing quote
    formattedLine = formattedLine + "\""
    # add comma at the end
    formattedLine = formattedLine + ","
    # re add new line
    formattedLine = formattedLine + "\n"
    # replace 4x space and tabs with escaped special tab
    formattedLine = formattedLine.replace("	", "\\t")
    formattedLine = formattedLine.replace("    ", "\\t")
    # add leading tabs
    formattedLine = "\t\t" + formattedLine

    destination.write(formattedLine)
    print(formattedLine)
    pass

destination.write(trailingBoilerPlate)

source.close()
destination.close()
