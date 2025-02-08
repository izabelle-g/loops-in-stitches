class Particle {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.size = random(4, 20); // adjusts particle size
      this.prevPos = this.pos.copy();
      this.colour = getColour(noise(x, y));
    }
    
    showPoints() {
      strokeWeight(this.size);
      stroke(this.colour);
      point(this.pos.x, this.pos.y);
    }
    
    showLines() {
      strokeWeight(this.size);
      stroke(this.colour);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }

    showCircles() {
        strokeWeight(1);
        stroke(0);
        fill(this.colour);
        circle(this.pos.x, this.pos.y, this.size);
    }

    showRectangles(){
        push();
        angleMode(RADIANS);
        strokeWeight(1);
        stroke(0);
        fill(this.colour);
        //translate(this.pos.x, this.pos.y);
        //rotate(angleBetween(this.pos, this.prevPos));
        rect(this.pos.x, this.pos.y, this.size, this.size * 2);
        pop();
    }
    
    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
    
    update() {
      let n = noise(this.pos.x, this.pos.y);
      updatePrev();
      this.pos.x += cos(n) * this.speed;
      this.pos.y += sin(n) * this.speed;
    }
  }