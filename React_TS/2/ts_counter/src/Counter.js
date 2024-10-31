"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function Counter() {
    var _a = (0, react_1.useState)(0), counter = _a[0], setCounter = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: "fonts", onClick: function () { return setCounter(counter + 2); }, children: "counter +" }), (0, jsx_runtime_1.jsx)("button", { className: "fonts", onClick: function () { return setCounter(counter - 2); }, children: "counter -" }), (0, jsx_runtime_1.jsxs)("div", { children: ["Current counter value is: ", counter] })] }));
}
exports.default = Counter;
