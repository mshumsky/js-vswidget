class Utils {
	static elementFromHTML(html) {
		const template = document.createElement("template");
		template.innerHTML = html;
		return template.content.cloneNode(true);
	}

	static queryParamsToObject (query) {
		const result = {};
		const cleanHash = query = query.trim().replace(/[#?]/ig, "");
	
		cleanHash.split("&").forEach((param) => {
			if (!param) return;
			const haveEqual = param.indexOf("=");
			if (haveEqual < 0)
				result[param] = true;
			else {
				const split = param.split("=");
				let value;
				try {value = JSON.parse(split[1]);}
				catch (err) {value = split[1];}
				result[split[0]] = value;
			}
		});
	
		return result;
	};
}

export default Utils;