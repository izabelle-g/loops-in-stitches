let cells;
let zoff = 0;
let fGrid = 7;  // for demo purposes, it is hard set to 11 for the smallest aida count fabric
let flowfield = [];

function setupFlowfield() {
    cells = floor( drawArea / fGrid );
    flowfield = new Array( cells * cells );
}

function generateFlowfield() {
    let inc = 0.02; // TODO: add zoom control
    //let zInc = 0.0005 * spdSlider.value(); 
    let zInc = 0.0005;
    let yoff = 0;

    for( let y = 0; y < cells; y++ ){
        let xoff = 0;
        for( let x = 0; x < cells; x++ ){
            let index = x + y * cells;
            let n = noise(xoff, yoff, zoff);
            let angle = n * TAU * 1; // TODO: add cells(?) control, in code, it changes the angle of the vector
            let v = p5.Vector.fromAngle(angle);

            xoff += inc;
            v.setMag(2);
            flowfield[index] = [v, x, y];
        }
        yoff += inc;
        zoff += zInc;
    }
}

function showFlowfield() {
    background(255);
    for( let f of flowfield ) {
        if( f != undefined ) {
            push();
            translate( f[1] * fGrid, f[2] * fGrid );
            rotate( f[0].heading() );
            stroke(0);
            strokeWeight(1); 
            line( fGrid/2, fGrid/2, fGrid, 0 );
            pop();
        }
    }
}