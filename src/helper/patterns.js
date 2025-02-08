let particles = [];
let numpart = 2000; // adjusts number of particles

function createParticles() {
    for( let i = 0; i < numpart; i++ ){
        particles[i] = new Particle( random(width), random(height) );
    }
}

function showParticles() {
    background(255, 50);
    for( let p of particles ){
        p.showPoints();
        //p.showCircles();
        //p.showRectangles();
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

function getColour(noiseVal) {
    let colour;
    let p = [ color("#ffd670"),
              color("#ff70a6"),
              color("#e9ff70"),
              color("#70d6ff"),
              color("#ff9770") ];
    
    if(noiseVal <= 0.375) {
        let n = map(noiseVal, 0, 0.375, 0, 1);
        colour = lerpColor(p[0], p[1], n);
    }
    else if(noiseVal > 0.375 && noiseVal <= 0.50) {
        let n = map(noiseVal, 0.375, 0.50, 0, 1);
        colour = lerpColor(p[1], p[2], n);
    }
    else if(noiseVal >= 0.625) {
        let n = map(noiseVal, 0.625, 1, 0, 1);
        colour = lerpColor(p[3], p[4], n); 
    }
    else {
        let n = map(noiseVal, 0.50, 0.625, 0, 1);
        colour = lerpColor(p[2], p[3], n);
    }
                      
    return colour;
}