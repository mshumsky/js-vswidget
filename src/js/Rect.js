import inlineSmallVideoSvg from "../images/smallvideo.svg";
import Utils from "./Utils";
import Widget from "./Widget";

class Rect {

	rootElem = undefined;

	constructor(mode) {
		const args = [];

		switch (mode) {
			case "rect-rounded":
				args.push(["VideoSales-Rounded"]);
			case "rect-semi-rounded":
				args.push(["VideoSales-SemiRounded"]);
			case "rect":
			default:
				args.push([]);
		}

		const rootElem = Utils.elementFromHTML(this.#genHtml.apply(this, args)).children[0];
		rootElem.onclick = Widget.onClickListener;

		this.rootElem = rootElem;
	}

	#genHtml(classList = []) {
		return (`
			<button class="${Widget.getRootClass()} VideoSales-Rect ${classList.join(" ")}">
				<div class="VideoSales-Rect__IconBox">
					${inlineSmallVideoSvg}
				</div>
				<p>Видеозвонок</p>
			</button>
		`)
	}

	inject() {
		document.getElementsByTagName("body")[0].appendChild(this.rootElem);
	}

}

export default Rect;