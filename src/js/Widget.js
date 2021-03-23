import Circle from "./Circle";
import HashParamMatcher from "./HashParamMatcher";
import Person from "./Person";
import Rect from "./Rect";
import Topbar from "./Topbar";

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
			case "topbar":
			case "sidebar":
				this.#createTopbar();
				break;
			case "person":
			case "person-bubble":
				this.#createPerson();
				break;
			case "rect":
			case "rect-rounded":
			case "rect-semi-rounded":
				this.#createRect();
				break;
			case "circle":
			default:
				this.#createCircle();
		}
	}

	#createTopbar() {
		const topbar = new Topbar();
		const rootElem = topbar.rootElem;
		this.rootElem = rootElem;
		topbar.inject();
	}

	#createPerson() {
		const person = new Person(this.mode);
		const rootElem = person.rootElem;
		this.rootElem = rootElem;
		person.inject();
	}

	#createRect() {
		const rect = new Rect(this.mode);
		const rootElem = rect.rootElem;
		this.rootElem = rootElem;
		rect.inject();
	}

	#createCircle() {
		const circle = new Circle();
		const rootElem = circle.rootElem;
		this.rootElem = rootElem;
		circle.inject();
	}

	static getRootClass() {
		return "VideoSales-Root";
	}

	static get onClickListener() {
		return Widget.#onClickListener.bind(Widget.singleton);
	}

	static #onClickListener() {
		this.matcher.trigger();
	}


}

export default Widget;
