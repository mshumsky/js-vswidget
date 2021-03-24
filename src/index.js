import "./scss/index.scss";
import Widget from "./js/Widget";
import config from "./js/config/default";
import theme from "./js/config/themes";
import Utils from "./js/Utils";

/* Load params from script src attribute query */

const src = document.currentScript.getAttribute("src");
const query = src.split("?");
query.shift();
const params = Utils.queryParamsToObject(query.join(""));

/* Merge config with params */

config(params);

/* Track current mode */

const changeMode = (modeName) => {
	config("currentMode", modeName);
	if (!Widget.singleton) return;
	Widget.singleton.reload();
}

const resizeListener = () => {
	const width = document.documentElement.clientWidth;
	const currentMode = config("currentMode");
	if (width <= 375 && currentMode !== "mobile") 
		changeMode("mobile");
	else if (width > 375 && currentMode !== "desktop")
		changeMode("desktop");
}

let throttle;
const resizeThrottle = () => {
	if (throttle) return;
	throttle = setTimeout(() => { 
		throttle = undefined;
		resizeListener();
	}, 500);
	resizeListener();
};

window.addEventListener("resize", resizeThrottle);

/* Run */

window.addEventListener("DOMContentLoaded", () => new Widget());