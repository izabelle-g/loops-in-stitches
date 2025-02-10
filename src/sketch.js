const aida = [ 11, 14, 16, 18, 20, 22, 25, 28, 32 ];  // aida cloth sizes
const actual = 4; // can adjust with slider
const drawSize = 600;  // the draw area size, does not change

function setup() {
    let canvas = createCanvas(drawSize, drawSize);
    canvas.position( ( ( windowWidth - width )/2 ), ( ( windowHeight - height )/2 ) ); // center canvas
    setupFlowfield();
    createParticles();
}

function draw() {
    generateFlowfield();
    showFlowfield();
    stitchGrid();
    //followField();
    //showParticles();
}

function stitchGrid() {
    let iGrid = drawSize / actual;
    let sGrid = iGrid / aida[0]; // will be changed by slider/dropdown
    let grid = drawSize / sGrid;

    strokeWeight(1);
    noFill();

    for( let y = 0; y < grid; y++ ) { 
        for( let x = 0; x < grid; x++ ) {
            stroke( 0, 15 );
            rect( x * sGrid, y * sGrid, sGrid, sGrid ); // will be replaced by the crosses
        }
    }

    // the inch grid
    for( let y = 0; y < actual; y++ ) {
        for( let x = 0; x < actual; x++ ) {
            stroke( 255, 0, 0, 50 );
            rect( x * iGrid, y * iGrid, iGrid, iGrid );
        }
    }
}

function pixelize() {
    
}