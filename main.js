const particles = [],
			fonts = {};

let scale,
		theme,
		graphics,
		themeWidth;

// var canvas = document.getElementById("homepageintro");

function setup() {
	var canvas = document.createElement("canvas");
	createCanvas(windowWidth, 700);
	// var canvas = createCanvas(windowWidth, 400);
	// document.getElementById("homepageintro").style.background = "url(" + canvas.toDataURL() + ")";
	// canvas.parent('homepageintro')
	// canvas.style('z-index', '1')
	// textAlign(RIGHT, BOTTOM)
	noStroke();
	fill(255);

	scale = random(8e2, 2e3);
	
	theme =
		{name: "Night Sky", colors: ["#45217C", "#0799F2", "#FFFFFF"], background: "#150832"};
	
	for (let i = 0; i < 200; i ++) particles.push(new Particle());
	
	graphics = createGraphics(width, height);
	graphics.background(theme.background);
	graphics.noStroke();
	
	textSize(120);
	themeWidth = textWidth(theme.name);
}

function draw() {
	for (const p of particles) p.update();
	for (const p of particles) p.draw();
	for (let i = 0; i < 5; i ++)
		particles.push(new Particle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
	
	image(graphics, 0, 0);
	
	
}

class Particle {
	constructor(x, y) {
		this.pos = new p5.Vector(x || random(-50, width + 50), y || random(-50, height + 50));
		this.color = random(theme.colors);
		this.r = random(1, 3);
	}
	
	update() {
		const dir = noise(this.pos.x / scale, this.pos.y / scale) * TAU * scale;
		this.pos.add(Math.cos(dir) / 2, Math.sin(dir) / 2);
		
		if (this.pos.x < -50 || this.pos.x > width + 50 || this.pos.y < -50 || this.pos.y > height + 50)
			this.pos.set(random(-50, width + 50), random(-50, height + 50));
	}
	
	draw() {
		graphics.fill(this.color);
		graphics.circle(this.pos.x, this.pos.y, this.r);
	}
}

function mousePressed() {
	for (let i = 0; i < 5; i ++)
		particles.push(new Particle(mouseX + random(-30, 30), mouseY + random(-30, 30)));
}

mouseDragged = mousePressed;