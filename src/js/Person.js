import inlineBubbleSvg from "../images/bubble.svg";
import PersonImageSrc from "../images/person.jpg";
import Utils from "./Utils";
import Widget from "./Widget";
import config from "./config/default";
import theme from "./config/themes";

class Person {

	rootElem = undefined;

	constructor() {
		const args = [];

		const rootElem = Utils.elementFromHTML(this.#genHtml()).children[0];
		rootElem.onclick = Widget.onClickListener;

		this.rootElem = rootElem;
		this.#animate();
	}

	#genHtml() {
		let posClass;
		switch (config("fab")) {
			case "tl": posClass = "VideoSales-TopLeft";
				break;
			case "tr": posClass = "VideoSales-TopRight";
				break;
			case "bl": posClass = "VideoSales-BottomLeft";
				break;
			case "br":
			default: posClass = "VideoSales-BottomRight";
		}

		const bubbleSvgElem = Utils.elementFromHTML(inlineBubbleSvg).children[0];
		bubbleSvgElem.setAttribute("viewBox", "10 10 274 107");

		const bubblePathElem = bubbleSvgElem.querySelector("path");
		bubblePathElem.setAttribute("fill", theme("backgroundColor"));

		return (`
			<button class="${Widget.getRootClass()} VideoSales-Person ${posClass}">
				<div class="VideoSales-Person__ImageBox">
					<img src="${config("imageSrc") || PersonImageSrc}"/>
				</div>
				<div class="VideoSales-Person__TextBoxAnimWrapper">
					<div class="VideoSales-Person__TextBox" style="background: ${theme("backgroundColor")}">
						<p style="color: ${theme("circlePrimaryTextColor")}">${config("primaryText")}</p>
					</div>
				</div>
				<div class="VideoSales-Person__BubbleBox">
					${bubbleSvgElem.outerHTML}
					<p style="color: ${theme("circleSecondaryTextColor")}">${config("secondaryText")}</p>
				</div>
			</button>
		`);
	}

	#animate() {
		const rootElem = this.rootElem;
		setTimeout(() => {
			const textboxElem = rootElem.querySelector(".VideoSales-Person__TextBox");
			textboxElem.classList.add("VideoSales-Person__TextBoxHidden");
			setTimeout(() => {
				const bubbleboxElem = rootElem.querySelector(".VideoSales-Person__BubbleBox");
				bubbleboxElem.classList.add("VideoSales-Person__BubbleBoxShown");
			}, 300);
		}, 3000);
	}

	inject() {
		Utils.getBody().appendChild(this.rootElem);
	}

}

export default Person;