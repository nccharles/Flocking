class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
  }

  align(boids) {
    let perceptionRadius = 50;
    let total = 0;
    let steeling = createVector();

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < perceptionRadius) {
        steeling.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steeling.div(total);
      steeling.sub(this.velocity);
    }
    return steeling;
  }
  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration = alignment;
  }
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
