import inlineBubbleSvg from "../images/bubble.svg";
import PersonImageSrc from "../images/person.jpg";
import Utils from "./Utils";
import Widget from "./Widget";

class Person {

	rootElem = undefined;

	constructor(mode) {
		const args = [];

		switch (mode) {
			case "person-bubble":
				args.push(true);
			case "person":
			default:
				args.push(false);
		}

		const rootElem = Utils.elementFromHTML(this.#genHtml.apply(this, args)).children[0];
		rootElem.onclick = Widget.onClickListener;

		this.rootElem = rootElem;
	}

	#genHtml(bubble) {
		return (`
			<button class="${Widget.getRootClass()} VideoSales-Person">
				<div class="VideoSales-Person__ImageBox">
					<img src="${PersonImageSrc}"/>
				</div>
				${!bubble ? `
						<div class="VideoSales-Person__TextBox">
							<p>Начать видеозвонок</p>
						</div>
					` : `
						<div class="VideoSales-Person__BubbleBox">
							${inlineBubbleSvg.replace(`viewBox="0 0 294 117"`, `viewBox="10 10 274 107"`)}
							<p>Привет! Я Маша, давайте созвонимся по видеосвязи и я покажу автомобиль, который вас интересует</p>
						</div>
					`
			}
			</button>
		`);
	}

	inject() {
		document.getElementsByTagName("body")[0].appendChild(this.rootElem);
	}

}

export default Person;