class Particle {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.size = random(10, 40); // adjusts particle size
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

    showRectangles() {
        strokeWeight(1);
        stroke(0);
        fill(this.colour);
        rect(this.pos.x, this.pos.y, this.size, this.size * 2);
    }

    showLines() {

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

  let particles = [];
let numpart = 6000; // adjusts number of particles

function createParticles() {
    for( let i = 0; i < numpart; i++ ){
        particles[i] = new Particle( random(width), random(height) );
    }
}

function showParticles() {
    background(255, 25);
    for( let p of particles ){
        //p.showPoints();
        //p.showCircles();
        //p.showRectangles();
        //p.showLines();
    }
}

function followField() {
    for(let p of particles) {
        let n = noise(p.pos.x, p.pos.y);
        
        let xIndex = floor(p.pos.x / grid);
        let yIndex = floor(p.pos.y / grid);
        xIndex = constrain(xIndex, 0, cols - 1);
        yIndex = constrain(yIndex, 0, rows - 1);
        
        index = xIndex + yIndex * cols;
        let v = flowfield[index][0];
        p.updatePrev();
        p.pos.add(v);
      
        if(!onScreen(p.pos)) {
            p.pos.x = random(width);
            p.pos.y = random(height);
        }
    }
}

function onScreen(p) {
    return p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height;
}