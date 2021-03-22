import "./scss/index.scss";
import Widget from "./js/Widget";

/* Load params from script src attribute query */

const src = document.currentScript.getAttribute("src");
const query = src.split("?");
query.shift();

const params = {};
query.forEach((param) => {
	const split = param.split("=");
	params[split[0]] = split[1];
});

/* Run */

new Widget(params);