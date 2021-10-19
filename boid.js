
class Boid {
	constructor() {
		this.position = createVector(random(width), random(height), random(depth));
		
		this.velocity = p5.Vector.random3D();
		this.velocity.setMag(random(2, 4));
		this.acceleration = createVector();
		this.maxForce = 0.2;
		this.maxSpeed = 10;
		this.color = {r : random(10, 255), g : random(10, 255), b : random(10, 255)};

		this.x = [],
		this.y = [],
		this.segNum = 20,
		this.segLength = 4;

		for (var i = 0; i < this.segNum; i++) {
			this.x[i] = 0;
			this.y[i] = 0;
		}
	}

	edges() {
		if (this.position.x < 0 || this.position.x > width)
			this.velocity.x = 0 - this.velocity.x;
		
		if (this.position.y < 0 || this.position.y > height)
			this.velocity.y = 0 - this.velocity.y;
		
		if (this.position.z < 1 || this.position.z > depth)
			this.velocity.z = 0 - this.velocity.z;
		
		return;
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = height;
		}
	}

	work(boids, perception) {
		let align = createVector();
		let cohesion = createVector();
		let separation = createVector();
		
		let total = 0;
		for (let other of boids) {
			if (other != this) {
				let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
				if (d < perception) {
					align.add(other.velocity);

					cohesion.add(other.position);

					let diff = p5.Vector.sub(this.position, other.position);
					diff.div(d * d);
					separation.add(diff);



					total++;
				}
			}
		}
		if (total > 0) {
			align.div(total);
			align.setMag(this.maxSpeed);
			align.sub(this.velocity);
			align.limit(this.maxForce);

			cohesion.div(total);
			cohesion.sub(this.position);
			cohesion.setMag(this.maxSpeed);
			cohesion.sub(this.velocity);
			cohesion.limit(this.maxForce);

			separation.div(total);
			separation.setMag(this.maxSpeed);
			separation.sub(this.velocity);
			separation.limit(this.maxForce);
		}
		return {
			align: align,
			cohesion: cohesion,
			separation: separation
		};
	}


	flock(boids, perception) {
		let w = this.work(boids, perception);
		let alignment = w.align;
		let cohesion = w.cohesion;
		let separation = w.separation;

		alignment.mult(alignSlider.value());
		cohesion.mult(cohesionSlider.value());
		separation.mult(separationSlider.value());

		this.acceleration.mult(0);
		this.acceleration.add(alignment);
		this.acceleration.add(cohesion);
		this.acceleration.add(separation);
		this.acceleration.z *= 0.0001;
	}

	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
	}

	show() {

		strokeWeight(this.position.z);
		
		this.dragSegment(0, this.position.x, this.position.y);
		
		for( var i= 0; i < this.x.length - 1; i++)
			this.dragSegment(i + 1, this.x[i], this.y[i]);
		
		

		strokeWeight(8);
		stroke(this.color.r, this.color.g, this.color.b);
		point(this.position.x, this.position.y);
	}

	dragSegment(i, xin, yin) {
		var dx = xin - this.x[i];
		var dy = yin - this.y[i];
		var angle = atan2(dy, dx);
		this.x[i] = xin - cos(angle) * this.segLength;
		this.y[i] = yin - sin(angle) * this.segLength;
		this.segment(this.x[i], this.y[i], angle);
	  }
	  
	  segment(x, y, a) {
		push();
		translate(x, y);
		rotate(a);
		line(0, 0, this.segLength, 0);
		pop();
	  }
}