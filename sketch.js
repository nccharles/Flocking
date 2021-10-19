
const flock = [];

let alignSlider, cohesionSlider, separationSlider;
let depth = 8;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - 30);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 4, 2, 0.1);
  perceptionSlider = createSlider(1, width > height ? height : width, 100, 1);
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  background(0);
	
  let perception = perceptionSlider.value();	
  for (let boid of flock) {
    boid.flock(flock, perception);
    boid.edges();
    boid.update();
    boid.show();
  } 


  textFont("Arial");
  textSize(12);
  fill(255);
  stroke(0);

  let size = 100;
  text(alignSlider.value(), size * 1, height - 14);
  text(cohesionSlider.value(), size * 2, height - 14);
  text(separationSlider.value(), size * 3, height - 14);
  text(perceptionSlider.value(), size * 4, height - 14);
}