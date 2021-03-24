/*
 * - Listens `hashchange` event;
 * - Fires `videosalesroutematch` event when `regexp` match in `window.location.hash` changes;
 * - Can trigger `clean` param in `window.location.hash` with public `trigger` method;
 */

class HashParamMatcher {

	regexp;
	clean;
	listener;
	active = false;

	constructor(regexp, clean) {
		this.regexp = regexp;
		this.clean = clean;
		this.listener = this.#listener.bind(this);
		window.addEventListener("hashchange", this.listener);
	}

	trigger() {
		const hash = window.location.hash;
		if (hash === undefined) {
			window.location.hash = this.clean;
			this.active = true;
		} else if (this.regexp.test(hash)) {
			window.location.hash = hash.replace(new RegExp(this.regexp.source, this.regexp.flags + "g"), "");
			this.active = false;
		} else {
			window.location.hash += `#${this.clean}`;
			this.active = true;
		}
	}

	unload() {
		window.removeEventListener("hashchange", this.listener);	
	}

	#listener(e) {
		const newHash = e.currentTarget.location.hash;
		const test = this.regexp.test(newHash);
		this.#dispatchEvent(test);
	}

	#dispatchEvent(detail) {
		const event = new CustomEvent("videosalesroutematch", {detail});
		window.dispatchEvent(event);
	}

}

export default HashParamMatcher;