"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
var Counter_1 = require("./Counter");
function App() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "This is my first TS counter :)" }), (0, jsx_runtime_1.jsx)(Counter_1.default, {})] }));
}
exports.default = App;
