const flock = [];

function setup() {
  createCanvas(1024, 1024);
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);

  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
