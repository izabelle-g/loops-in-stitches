let cols, rows;
let zoff = 0;
let grid = 16;  
let flowfield = [];

function setupFlowfield() {
    cols = floor( width / grid );
    rows = floor( height / grid );

    flowfield = new Array( cols * rows );
}

function generateFlowfield() {
    let inc = 0.1;
    let zInc = 0.00009; // adjusts the wiggly
    let yoff = 0;

    for( let y = 0; y < rows; y++ ){
        let xoff = 0;
        for( let x = 0; x < cols; x++ ){
            let index = x + y * cols;
            let n = noise(xoff, yoff, zoff);
            let angle = n * TAU; // adjusts the craziness (more different flow directions)
            let v = p5.Vector.fromAngle(angle);

            xoff += inc;
            v.setMag(2);  // adjusts how much the particles follow it
            flowfield[index] = [v, x, y, n];
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
            //textSize(5);
            //text( round( f[3], 2 ), f[1], f[2], grid, grid );
            rotate( f[0].heading() );
            stroke(0);
            strokeWeight(1); 
            line( 0, 0, grid, 0 );
            pop();
        }
    }
}