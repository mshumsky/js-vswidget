import HashParamMatcher from "./HashParamMatcher";
import inlineBigVideoSvg from "../images/bigvideo.svg";
import inlineSmallVideoSvg from "../images/smallvideo.svg";

class Widget {
	
	static singleton = undefined;
	rootElem = undefined;
	matcher = undefined;
	mode = undefined;

	constructor({mode}) {
		if (Widget.singleton !== undefined) 
			return;
		Widget.singleton = this;

		this.mode = mode;
		this.matcher = new HashParamMatcher(/\Wcall/i, "call");

		switch (mode) {
			case "rect":
			case "rect-rounded":
			case "rect-semi-rounded":
				this.#buildRect();
				break;
			case "circle":
			default:
				this.#buildCircle();			
		}
	}

	#buildRootButton() {
		this.rootElem = document.createElement("button");
		this.rootElem.onclick = this.#onClickListener.bind(this);
		this.rootElem.classList.add("VideoSales-Root");
		return this.rootElem;
	}

	#createIcon(inlineSvg) {
		const svgElem = document.createElement("div");
		svgElem.className = "VideoSales-Icon";
		svgElem.innerHTML = inlineSvg;
		return svgElem;
	}

	#buildCircle(inject = true) {
		const rootElem = this.#buildRootButton();
		rootElem.classList.add("VideoSales-Circle");

		const iconElem = this.#createIcon(inlineBigVideoSvg);
		rootElem.appendChild(iconElem);

		inject && this.#inject();
	}

	#buildRect() {
		const rootElem = this.#buildRootButton();
		rootElem.classList.add("VideoSales-Rect");

		switch (this.mode) {
			case "rect-rounded":
				rootElem.classList.add("VideoSales-Rounded");
				break;
			case "rect-semi-rounded":
				rootElem.classList.add("VideoSales-SemiRounded");
				break;
		}

		const iconElem = this.#createIcon(inlineSmallVideoSvg);
		rootElem.appendChild(iconElem);

		const pElem = document.createElement("p");
		pElem.innerText = "Видеозвонок";
		rootElem.appendChild(pElem);

		this.#inject();
	}

	#onClickListener() {
		this.matcher.trigger();
	}

	#inject() {
		document.getElementsByTagName("body")[0].appendChild(this.rootElem);
	}

}

export default Widget;
