function scales() {
    background(255, 2);
    zInc = 0.0009;
    for(let f of flowfield) {
      if(f != undefined) {
        let n = noise( f[0].x, f[0].y, zoff );
        push();
        stroke( getColour(n) );
        translate( f[1] * fGrid+fGrid, f[2] * fGrid+fGrid/2 );
        rotate( f[0].heading() );
        strokeWeight(1);
        line( 0, 0, fGrid, 0 );
        pop();
      }
    }
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