/* function smoke() {
  background(255);
  zInc = 0.0009;
  for(let f of flowfield) {
    let n = noise( f[0].x, f[0].y, zoff );
    push();
    noStroke();
    translate( f[1] * fGrid+fGrid, f[2] * fGrid+fGrid/2 );
    fill( getColour(n) );
    rect( f[0].x, f[0].y, fGrid, fGrid );
    pop();
  }
} */