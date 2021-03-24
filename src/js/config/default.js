/*
 * Here defined default settings they will be merged with user settings;
 */

let config = {
	fab: "br", /* (tl|tr|bl|br) */
	theme: "videosales",	 /* (videosales) */
	mobileMode: "topbar", /* (person/topbar) */
	desktopMode: "topbar", /* (person/topbar) */
	primaryText: "Бесплатный звонок", /* (String) */
	secondaryText: "Начать видеозвонок", /* (String) */
	attract: true, /* (true/false) */
	currentMode: "desktop" /* (DO NOT TOUCH) */
}

export default (merge) => {
	if (typeof merge === "object")
		return config = {...config, ...merge};
	else if (typeof merge === "string")
		return config[merge];
	else {
		config = {...config, ...merge};
		return config;
	}
};