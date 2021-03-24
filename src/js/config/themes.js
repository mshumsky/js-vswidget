import config from "./default";

/* Default theme */

const defaultTheme = {
	backgroundColor: "#602EEC",
	topbarCircleColor: "#7040F5",
	topbarPrimaryTextColor: "#FFFFFF",
	topbarSecondaryTextColor: "#FFFFFF",
	circlePrimaryTextColor: "#FFFFFF",
	circleSecondaryTextColor: "#FFFFFF",
	rectTextColor: "#FFFFFF"
};

/* Themes object */

const themes = {
	videosales: defaultTheme
}

/* Another themes */

const addTheme = (key, params) => {
	themes[key] = {...defaultTheme, ...params};
}

/* Export */

export default (key) => {
	if (!key)
		return themes[config("theme")];
	return themes[config("theme")][key];
}