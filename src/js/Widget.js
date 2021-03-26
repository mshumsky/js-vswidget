import config from "./config/default";
import HashParamMatcher from "./HashParamMatcher";
import Person from "./Person";
import Rect from "./Rect";
import Topbar from "./Topbar";

class Widget {

	static singleton = undefined;
	matcher = undefined;

	controller = undefined;

	constructor() {
		if (Widget.singleton !== undefined)
			return;
		Widget.singleton = this;

		this.matcher = new HashParamMatcher(/\Wcall/i, "call");

		const mode = config("currentMode");
		if (mode === "mobile") {
			const mobileMode = config("mobileMode");
			switch (mobileMode) {
				case "person":
					this.#createPerson();
					break;
				case "topbar":
					this.#createTopbar();
					break;
				case "rect":
				case "rect-rounded":
				case "rect-semi-rounded":
				default:
					this.#createRect(mobileMode);
			}
		} else if (mode === "desktop") {
			const desktopMode = config("desktopMode");
			switch (desktopMode) {
				case "person":
					this.#createPerson();
					break;
				case "topbar":
					this.#createTopbar();
					break;
				case "rect":
				case "rect-rounded":
				case "rect-semi-rounded":
				default:
					this.#createRect(desktopMode);
			}
		}
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

	#createRect(mode) {
		const rect = new Rect(mode);
		this.controller = rect;
		rect.inject();
	}

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
		/* Trigger hash */
		config("triggerHash") && (
			this.matcher.trigger()
		);

		/* Trigger event */
		config("triggerEvent") && (() => {
			const event = new CustomEvent("videosaleswidgetclick", {detail: this.controller.rootElem})
			window.dispatchEvent(event);
		})();
	}

}

export default Widget;
