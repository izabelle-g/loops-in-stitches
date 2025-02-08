let cols, rows;
let zoff = 0;
let grid = 16;  // adjusts the aida cloth size (maybe; because want one grid = 1 inch then 11, 14, etc., stitches in said grid)
let flowfield = [];

function setupFlowfield() {
    cols = floor( width / grid );
    rows = floor( height / grid );

    flowfield = new Array( cols * rows );
}

function generateFlowfield() {
    let inc = 0.1;
    let zInc = 0.0009; // adjusts the wiggly
    let yoff = 0;

    for( let y = 0; y < rows; y++ ){
        let xoff = 0;
        for( let x = 0; x < cols; x++ ){
            let index = x + y * cols;
            let n = noise(xoff, yoff, zoff);
            let angle = n * TAU; // adjusts the craziness (more different flow directions)
            let v = p5.Vector.fromAngle(angle);

            xoff += inc;
            v.setMag(1);  // adjusts how much the particles follow it
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
            translate( f[1] * grid, f[2] * grid );
            rotate( f[0].heading() );
            stroke(0, 25);
            strokeWeight(1); 
            line( 0, 0, grid, 0 );
            pop();
        }
    }
}