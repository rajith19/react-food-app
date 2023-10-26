import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("div", { id: "parent" }, [
    React.createElement("div", { id: "child1" }, [
        React.createElement("h1", {}, "H1 tag it is"),
        React.createElement("h2", {}, "h2 tag it is")
    ]),
    React.createElement("div", { id: "child2" }, [
        React.createElement("h1", {}, "H1 tag it is"),
        React.createElement("h2", {}, "h2 tag it is")
    ])
]

);
const root = ReactDOM.createRoot(document.getElementById("root")).render(heading);