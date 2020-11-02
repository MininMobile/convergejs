# converge.js
converge.js is a tool for working with graphics on html5 websites. it is similar to [p5*](https://p5js.org/) except instead of having a js canvas as the user interface, it has a html element acting as a canvas where elements can be manipulated at will

friendly reminder that this is a project made as a learning experience, it is recommended that you please do not attempt to use this as an actual framework for anything other than a proof of concept. please use one of the many already existing standard frameworks instead, see [literally anything else]

## usage
```html
<html>
<head>
	<script src="src/lib/converge.js"></script>
</head>

<body>
	<div id="canvas"></div>

	<script>
		let canvas = document.getElementById("canvas");
		let c = new cvg.Canvas(canvas, "600px", "450px", 24);

		c.style([["background", "gray"]]);
		let box = c.new("box", "element");
		box.style([["background", "blue"]])
		let i = 0;

		c.on("loop", () => {
			i += 0.5;
			box.move({x:(Math.cos(i)*50)+50 + "px"});
		});

		box.on("moved", () => {
			if (i % 2 == 0) {
				box.style([["background", "white"]]);
			} else {
				box.style([["background", "black"]]);
			}
		});
	</script>
</body>
</html>
```

## event reference
### canvas events
#### loop
executed every frame, specify fps as the 4th parameter of the canvas's constructor. gives no parameters
#### styled
executed every time `canvas.style(...)` is used. gives the parameters that you entered
#### newElem
executed every time a new element is created. gives the parameter of what it returns
#### mouseDown
executed on a mouse key being pressed down on the canvas. gives the parameter of the mouse event
#### mouseUp
executed on a mouse key being released on the canvas. gives the parameter of the mouse event
#### keyDown
executed on a key being pressed down. gives the parameter of the key event
#### keyUp
executed on a key being released. gives the parameter of the key event

### element events
#### styled
executed every time `elem.style(...)` is used. gives the parameters that you entered
#### moved
executed every time `elem.move(...)` is used. gives the parameters that you entered
#### resized
executed every time `elem.size(...)` is used. gives the parameters that you entered
#### edited
executed every time `elem.content(...)` is used. gives the parameters that you entered
#### newElem
executed every time a new element is created. gives the parameter of what it returns
#### mouseDown
executed on a mouse key being pressed down on the element. gives the parameter of the mouse event
#### mouseUp
executed on a mouse key being released on the element. gives the parameter of the mouse event
