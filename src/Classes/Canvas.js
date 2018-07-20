const Elem = require("./Elem");
const Cube = require("./Cube");

/**
 * Main Canvas
 */
class Canvas {
	/**
	 * Initialize Canvas Element
	 * @param {Element} element
	 * @param {string} width 200px
	 * @param {string} height 100px
	 * @param {fps} fps 30fps
	 */
	constructor(element, width = "200px", height = "100px", fps = 30) {
		/** @type {Element} */
		this.c = element;

		/** @type {string} */
		this.c.style.width = width;
		/** @type {string} */
		this.c.style.height = height;

		/** @type {number} */
		this.fps = fps;

		/** @type {string[]} */
		this.elementRegister = [ ];

		this.ev = {};
		this.ev.styled = () => {};
		this.ev.newElem = () => {};
		this.ev.loop = () => {};
		this.ev.mouseDown = () => {};
		this.ev.mouseUp = () => {};
		this.ev.keyDown = () => {};
		this.ev.keyUp = () => {};

		this.c.addEventListener("pointerdown", this.ev.mouseDown);
		this.c.addEventListener("pointerup", this.ev.mouseUp);
		document.addEventListener("keydown", this.ev.keyDown);
		document.addEventListener("keyup", this.ev.keyUp);

		setInterval(() => { this.ev.loop(); }, 1000/this.fps)
	}

	/**
	 * Change the styling of the Canvas
	 * @param {string[][]} style Object
	 * @description Example Input: [["background", "pink"], ["color", "blue"]]
	 */
	style(style) {
		for (let i = 0; i < style.length; i++) {
			this.c.style.setProperty(style[i][0], style[i][1]);
		}

		this.ev.styled(style);
	}

	/**
	 * Creates new Element in Canvas
	 * @param {string} type Type of Element
	 * @param {string} tag Name of Element
	 * @returns {Elem} New Element
	 */
	new(type, tag) {
		let newElement = new Elem(type, tag);

		this.c.appendChild(newElement.element);
		this.elementRegister.push(newElement);

		this.ev.newElem(newElement);
		return newElement;
	}

	/**
	 * Get the Width and Height of the Canvas (In Pixels)
	 * @returns {Cube} X, Y and Z
	 */
	getSize() {
		let x = parseInt(this.c.offsetWidth, 10);
		let y = parseInt(this.c.offsetHeight, 10);
		return new Cube(x, y);
	}

	/**
	 * Get a Canvas Element by Tag
	 * @param {string} tag Name of Element
	 * @returns {Elem} Canvas Element
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
			case "newElem":
				this.ev.newElem = action;
				break;
			case "loop":
				this.ev.loop = action;
				break;
			case "mouseDown":
				this.ev.mouseDown = action;
			case "mouseUp":
				this.ev.mouseUp = action;
			case "keyDown":
				this.ev.keyDown = action;
			case "keyUp":
				this.ev.keyUp = action;
		}
	}
}

module.exports = Canvas;