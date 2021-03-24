import inlineMediumVideoSvg from "../images/mediumvideo.svg";
import Widget from "./Widget";
import Utils from "./Utils";

import config from "./config/default";
import theme from "./config/themes";

class Topbar {

	rootElem = undefined;
	tuneElem = undefined;

	constructor() {
		const rootElem = Utils.elementFromHTML(this.#genHtml()).children[0];
		rootElem.onclick = Widget.onClickListener;

		this.rootElem = rootElem;

		/* Tune body padding to clear space for our topbar;
		 * See notice below; */
		/* this.#tuneBody(); */
	}

	#genHtml() {
		const videoSvgElem =  Utils.elementFromHTML(inlineMediumVideoSvg).children[0];
		
		const videoSvgPathElems = videoSvgElem.querySelectorAll("path");
		videoSvgPathElems.forEach((pathElem) =>
			pathElem.setAttribute("stroke", theme("topbarIconColor")));

		return (`
			<button class="${Widget.getRootClass()} VideoSales-Topbar" style="background: ${theme("backgroundColor")}">
				<div class="VideoSales-Topbar__ContentBox">
					<div class="VideoSales-Topbar__IconBox" style="background: ${theme("topbarCircleColor")}">
						${videoSvgElem.outerHTML}
					</div>
					<div class="VideoSales-Topbar_TextBox">
						<p style="color: ${theme("topbarPrimaryTextColor")}">Связаться по видео</p>
						<p style="color: ${theme("topbarSecondaryTextColor")}">Покажем автомобиль прямо сейчас</p>
					</div>
				</div>
			</button>
		`);
	}

	#tuneBody() {
		const mobileMode = config("currentMode") === "mobile";
		const topbarHeight = mobileMode ? 60 : 90;

		const body = Utils.getBody();
		const bodyPaddingTop = this.#getElemPaddingTop(body);

		body.style.paddingTop = `${bodyPaddingTop + topbarHeight}px`;
	}

	#unTuneBody() {
		const desktopMode = config("currentMode") === "desktop";
		const topbarHeight = desktopMode ? 60 : 90;

		const body = Utils.getBody();
		const bodyPaddingTop = this.#getElemPaddingTop(body);

		body.style.paddingTop = `${bodyPaddingTop - topbarHeight}px`;
	}

	#getElemPaddingTop(elem) {
		return parseInt(getComputedStyle(elem).getPropertyValue("padding-top"));
	}

	unload() {
		/*
		 * Seems like with pushing elements down by inserting `div` placeholder is better;
		 * So, we don't need this anymore; */
		/* this.#unTuneBody(); */
		this.tuneElem.remove();
		delete this.tuneElem;
	}

	inject() {
		const body = Utils.getBody();
		body.appendChild(this.rootElem);
		
		const tuneElem = document.createElement("div");
		tuneElem.className = `VideoSales-Topbar VideoSales-Tuner`;
		tuneElem.style.display = "block";
		tuneElem.style.position = "static";
		tuneElem.style.background = "transparent";
		this.tuneElem = tuneElem;

		body.prepend(tuneElem);
	}

}

export default Topbar;