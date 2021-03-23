import inlineMediumVideoSvg from "../images/mediumvideo.svg";
import Widget from "./Widget";
import Utils from "./Utils";



class Topbar {

	rootElem = undefined;

	constructor() {
		const rootElem = Utils.elementFromHTML(this.#genHtml()).children[0];
		this.rootElem = rootElem;
	}

	#genHtml() {
		return (`
			<div class="${Widget.getRootClass()} VideoSales-Topbar">
				<div class="VideoSales-Topbar__ContentBox">
					<div class="VideoSales-Topbar__IconBox">
						${inlineMediumVideoSvg}
					</div>
					<div class="VideoSales-Topbar_TextBox">
						<p>Связаться по видео</p>
						<p>Покажем автомобиль прямо сейчас</p>
					</div>
				</div>
			</div>
		`);
	}

	inject() {
		document.getElementsByTagName("body")[0].appendChild(this.rootElem);
	}

}

export default Topbar;