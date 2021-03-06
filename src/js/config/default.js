/*
 * Here defined default settings they will be merged with user settings;
 */

let config = {
	fab: "br", /* (tl|tr|bl|br) */
	theme: "videosales",	 /* (videosales) */
	mobileMode: "person", /* (person/topbar) */
	desktopMode: "topbar", /* (person/topbar) */
	topbarPrimaryText: "Связаться по видео", /* (String) */
	topbarSecondaryText: "Покажем автомобиль прямо сейчас", /* (String) */
	rectPrimaryText: "Видеозвонок", /* (String) */
	personPrimaryText: "Начать видеозвонок", /* (String) */
	personSecondaryText: "Привет! Я Маша, давайте созвонимся по видеосвязи и я покажу автомобиль, который вас интересует.",
	attract: true, /* (true/false) */
	imageSrc: false, /* (false/string) */
	triggerHash: true, /* (true/false) */
	triggerEvent: true, /* (true/false) */
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