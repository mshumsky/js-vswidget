import inlineMediumVideoSvg from "../images/mediumvideo.svg";
import Utils from "./Utils";
import Widget from "./Widget";

class Circle {

	rootElem = undefined;

	constructor(mode) {
		const rootElem = Utils.elementFromHTML(this.#genHtml()).children[0];
		rootElem.onclick = Widget.onClickListener;
		this.rootElem = rootElem;
	}

	#genHtml() {
		return (`
			<button class="${Widget.getRootClass()} VideoSales-Circle">
				${inlineMediumVideoSvg}
			</button>
		`)
	}

	inject() {
		document.getElementsByTagName("body")[0].appendChild(this.rootElem);
	}

}

export default Circle;