class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.mxSpeed = 4;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  align(boids) {
    let perceptionRadius = 100;
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
        steeling.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steeling.div(total);
      steeling.sub(this.position);
      steeling.setMag(this.maxSpeed);
      steeling.sub(this.velocity);
      steeling.limit(this.maxForce);
    }
    return steeling;
  }
  cohesion(boids) {
    let perceptionRadius = 100;
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
        steeling.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steeling.div(total);
      steeling.sub(this.position);
      steeling.setMag(this.maxSpeed);
      steeling.sub(this.velocity);
      steeling.limit(this.maxForce);
    }
    return steeling;
  }
  flock(boids) {
    this.acceleration.mult(0);
    let cohesion = this.cohesion(boids);
    let alignment = this.align(boids);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  }
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}
