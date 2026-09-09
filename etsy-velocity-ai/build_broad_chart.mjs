import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const inputPath = process.argv[2];
const outputPath = process.argv[3];
if (!inputPath || !outputPath) throw new Error("Usage: node build_broad_chart.mjs <broad_ranked.csv> <broad_score_comparison.png>");

const imported = await Workbook.fromCSV(await fs.readFile(inputPath, "utf8"), { sheetName: "Broad scores" });
const values = imported.worksheets.getItem("Broad scores").getUsedRange().values;
const headers = values[0];
const index = (name) => {
  const found = headers.indexOf(name);
  if (found < 0) throw new Error(`Missing column: ${name}`);
  return found;
};
const queryCol = index("query");
const marketCol = index("MarketSignalScore");
const entryCol = index("EntryOpportunityScore");
const persistenceCol = index("PersistenceScore");
const finalCol = index("BroadOpportunityScore");
const rows = values.slice(1).map((row) => [
  String(row[queryCol]), Number(row[marketCol]), Number(row[entryCol]),
  row[persistenceCol] === "" ? null : Number(row[persistenceCol]), Number(row[finalCol]),
]).sort((a, b) => b[4] - a[4]).slice(0, 20);

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Broad scores");
sheet.showGridLines = false;
sheet.getRange("A1:D1").values = [["Query", "Market Signal", "Entry Opportunity", "Persistence"]];
sheet.getRange("A2").write(rows.map((row) => row.slice(0, 4)));
sheet.getRange(`A1:D${rows.length + 1}`).format.font = { name: "Arial", size: 10 };
sheet.getRange("A1:D1").format = { fill: "#1F2937", font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" } };
sheet.getRange(`B2:D${rows.length + 1}`).format.numberFormat = "0.0";
const chart = sheet.charts.add("bar", sheet.getRange(`A1:D${rows.length + 1}`));
chart.title = "Broad Scanner scores";
chart.titleTextStyle.fontSize = 14;
chart.titleTextStyle.typeface = "Arial";
chart.legend = { position: "top", textStyle: { typeface: "Arial", fontSize: 10 } };
chart.xAxis = { axisType: "textAxis", textStyle: { typeface: "Arial", fontSize: 9 } };
chart.yAxis = { numberFormatCode: "0", numberFormatSourceLinked: false, textStyle: { typeface: "Arial", fontSize: 9 } };
chart.series.items[0].fill = "#2563EB";
chart.series.items[1].fill = "#14B8A6";
chart.series.items[2].fill = "#F59E0B";
chart.setPosition("F2", "R38");
workbook.recalculate();
const check = await workbook.inspect({ kind: "table", range: `Broad scores!A1:D${rows.length + 1}`, include: "values,formulas", tableMaxRows: 22, tableMaxCols: 4 });
console.log(check.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log(errors.ndjson);
const preview = await workbook.render({ sheetName: "Broad scores", range: "F2:R38", scale: 2, format: "png" });
await fs.writeFile(outputPath, new Uint8Array(await preview.arrayBuffer()));
