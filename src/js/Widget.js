import Circle from "./Circle";
import HashParamMatcher from "./HashParamMatcher";
import Person from "./Person";
import Rect from "./Rect";
import Topbar from "./Topbar";
import config from "./config/default";

class Widget {

	static singleton = undefined;
	rootElem = undefined;
	matcher = undefined;

	constructor() {
		if (Widget.singleton !== undefined)
			return;
		Widget.singleton = this;

		this.matcher = new HashParamMatcher(/\Wcall/i, "call");

		this.#createPerson();
		
	}

	#createPerson() {
		const person = new Person();
		const rootElem = person.rootElem;
		this.rootElem = rootElem;
		person.inject();
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
		this.rootElem && this.rootElem.remove();
		delete this.rootElem;

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
