const Point = require("./Point");
const Cube = require("./Cube");

/**
 * Canvas Element
 */
class Elem {
	/**
	 * Create Canvas Element
	 * @param {string} type 
	 * @param {string} tag 
	 */
	constructor(type, tag, setSize = true) {
		let elementTypes = {
			"box":"div",
			"text":"p"
		}

		/** @type {DOMTokenList} */
		this.classes = this.element.classList;

		/** @type {string} */
		this.tag = tag;

		/** @type {Element} */
		this.element = document.createElement(elementTypes[type]);

		/** @type {string[]} */
		this.elementRegister = [ ];

		this.ev = {};
		this.ev.styled = () => {};
		this.ev.moved = () => {};
		this.ev.resized = () => {};
		this.ev.edited = () => {};
		this.ev.newElem = () => {};
		this.ev.mouseDown = () => {};
		this.ev.mouseUp = () => {};

		this.c.addEventListener("pointerdown", this.ev.mouseDown);
		this.c.addEventListener("pointerup", this.ev.mouseUp);

		this.element.setAttribute("id", tag);
		this.element.style.position = "absolute";
		if (setSize) this.size({ height:"100px", width:"100px" });
		this.move({ x:"0px", y:"0px" });
	}

	/**
	 * Creates new Child Element in this Elememt
	 * @param {string} type Type of Element
	 * @param {string} tag Name of Element
	 * @returns {Elem} New Child Element
	 */
	new(type, tag) {
		let newElement = new Elem(type, tag);

		this.element.appendChild(newElement.element);
		this.elementRegister.push(newElement);

		this.ev.newElem(newElement);
		return newElement;
	}

	/**
	 * Change the styling of the Element
	 * @param {string[][]} style Object
	 * @description Example Input: [["background", "pink"], ["color", "blue"]]
	 */
	style(style) {
		for (let i = 0; i < style.length; i++) {
			this.element.style.setProperty(style[i][0], style[i][1]);
		}

		this.ev.styled(style);
	}

	/**
	 * Set the html attributes of the Element
	 * @param {string[][]} style Object
	 * @description Example Input: [["href", "#"], ["onclick", "action()"]]
	 */
	setAttribute(attributes) {
		for (let i = 0; i < attributes.length; i++) {
			this.element.setAttribute(attributes[i][0], attributes[i][1]);
		}
	}

	/**
	 * Change Element Size
	 * @param {object} resolution Height and Width
	 * @description Example Input: { height:"100px", width:"100px" }
	 */
	size(resolution) {
		if (resolution.width != undefined) this.element.style.width = resolution.width;
		if (resolution.height != undefined) this.element.style.height = resolution.height;

		this.ev.resized(resolution);
	}

	/**
	 * Move Canvas Element
	 * @param {object} amount X and Y
	 * @description Example Input: { x:"36px", y: "64px" }
	 */
	move(amount) {
		if (amount.x != undefined) this.element.style.left = amount.x;
		if (amount.y != undefined) this.element.style.top = amount.y;

		this.ev.moved(amount);
	}

	/**
	 * Change Text Content of Element
	 * @param {string} text 
	 */
	content(text) {
		this.element.textContent = text;

		this.ev.edited(text);
	}

	/**
	 * Get the Width and Height of the Element (In Pixels)
	 * @returns {Cube} X, Y and Z
	 */
	getSize() {
		let x = parseInt(this.element.offsetWidth, 10);
		let y = parseInt(this.element.offsetHeight, 10);
		return new Cube(x, y);
	}

	/**
	 * Get the X and Y position of the Element
	 * @returns {Point} X, Y and Z
	 */
	getPos() {
		let x = parseInt(this.element.style.left, 10);
		let y = parseInt(this.element.style.top, 10);
		return new Point(x, y);
	}

	/**
	 * Get a Child Element of this Element by Tag
	 * @param {string} tag Name of Element
	 * @returns {Elem} Child Element
	 */
	getElement(tag) {
		for (var i = 0; i < this.elementRegister.length; i++) {
			if(this.elementRegister[i].tag == tag) {
				return this.elementRegister[i];
			}
		}
	}

	/**
	 * Execute Function on Event
	 * @param {string} event Event to Perform to
	 * @param {function} action Function to run
	 */
	on(event, action) {
		switch (event) {
			case "styled":
				this.ev.styled = action;
				break;
			case "moved":
				this.ev.moved = action;
				break;
			case "resized":
				this.ev.resized = action;
				break;
			case "edited":
				this.ev.edited = action;
				break;
			case "newElem":
				this.ev.newElem = action;
				break;
			case "mouseDown":
				this.ev.mouseDown = action;
			case "mouseUp":
				this.ev.mouseUp = action;
		}
	}
}

module.exports = Elem;