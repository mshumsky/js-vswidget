class HashParamMatcher {

	regexp;
	clean;
	match = false;

	constructor(regexp, clean) {
		this.regexp = regexp;
		this.clean = clean;
		window.addEventListener("hashchange", this.#listener.bind(this));
	}

	trigger() {
		const hash = window.location.hash;
		if (hash === undefined) {
			window.location.hash = this.clean;
		} else if (this.regexp.test(hash)) {
			window.location.hash = hash.replace(new RegExp(this.regexp.source, this.regexp.flags + "g"), "");
		} else {
			window.location.hash += `#${this.clean}`;
		}
	}

	#listener(e) {
		const newHash = e.currentTarget.location.hash;
		const test = this.regexp.test(newHash);
		if (
			this.match === false && test ||
			this.match === true && !test
		) this.#dispatchEvent(test);
	}

	#dispatchEvent(match) {
		const event = new CustomEvent("videosalesroutematch", {match});
		window.dispatchEvent(event);
	}

}

export default HashParamMatcher;