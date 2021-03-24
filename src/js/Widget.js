import Circle from "./Circle";
import HashParamMatcher from "./HashParamMatcher";
import Person from "./Person";
import Rect from "./Rect";
import Topbar from "./Topbar";
import config from "./config/default";

class Widget {

	static singleton = undefined;
	matcher = undefined;

	controller = undefined;

	constructor() {
		if (Widget.singleton !== undefined)
			return;
		Widget.singleton = this;

		this.matcher = new HashParamMatcher(/\Wcall/i, "call");

		this.#createTopbar();
	}

	#createPerson() {
		const person = new Person();
		this.controller = person;
		person.inject();
	}

	#createTopbar() {
		const topbar = new Topbar();
		this.controller = topbar;
		topbar.inject();
	}
	

	// #createTopbar() {
	// 	const topbar = new Topbar();
	// 	const rootElem = topbar.rootElem;
	// 	this.rootElem = rootElem;
	// 	topbar.inject();
	// }

	// #createPerson() {
	// 	const person = new Person(this.mode);
	// 	const rootElem = person.rootElem;
	// 	this.rootElem = rootElem;
	// 	person.inject();
	// }

	// #createRect() {
	// 	const rect = new Rect(this.mode);
	// 	const rootElem = rect.rootElem;
	// 	this.rootElem = rootElem;
	// 	rect.inject();
	// }

	// #createCircle() {
	// 	const circle = new Circle();
	// 	const rootElem = circle.rootElem;
	// 	this.rootElem = rootElem;
	// 	circle.inject();
	// }

	reload() {
		if (this.controller) {
			this.controller.unload && 
				this.controller.unload();
			this.controller.rootElem.remove();
			delete this.controller.rootElem;
		}
		delete this.controller;

		this.matcher.unload();

		Widget.singleton = undefined;
		return new Widget();
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
